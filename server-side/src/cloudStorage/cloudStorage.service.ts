import { Injectable, Logger } from '@nestjs/common';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import {
  GalleryTypeEnum,
  PostGalleryTypeImageTypeResponseType,
} from './dtos';

@Injectable()
export class CloudStorageService {
  private client: S3Client;
  private readonly baseUrl: string;
  private readonly logger = new Logger(CloudStorageService.name);

  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      endpoint: this.configService.get('BUCKET_ENDPOINT'),
      region: this.configService.get('BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('BUCKET_ACCESS_KEY'),
        secretAccessKey: this.configService.get('BUCKET_SECRET_KEY'),
      },
    });

    const bucketName = this.configService.get('BUCKET_NAME');
    const bucketRegion = this.configService.get('BUCKET_REGION');
    this.baseUrl = `https://${bucketName}.${bucketRegion}.cdn.digitaloceanspaces.com`;
  }

  async fetchGalleryImagesLinks(
    galleryType: GalleryTypeEnum,
  ): Promise<PostGalleryTypeImageTypeResponseType[]> {
    try {
      const fullCommand = new ListObjectsV2Command({
        Bucket: this.configService.get('BUCKET_NAME'),
        Prefix: `${galleryType}/full/`,
      });

      const fullResponse = await this.client.send(fullCommand);

      if (!fullResponse.Contents || fullResponse.Contents.length === 0) {
        this.logger.warn(`No images found for gallery type: ${galleryType}`);
        return [];
      }

      const fullImages = (fullResponse.Contents)
        .filter((item) => !item.Key.endsWith('/')) // i manage cloud storage, so i know that i have no folders on that level, but just in case 
        .map((item) => item.Key);

      // Now fetch dimensions for each image
      // We process them in parallel using Promise.all for better performance
      const imagesWithDimensions = await Promise.all(
        fullImages.map(async (key) => {
          try {
            const getObjectCommand = new GetObjectCommand({
              Bucket: this.configService.get('BUCKET_NAME'),
              Key: key,
              Range: 'bytes=0-10239', // look at response, if it could be reduced further and what specificly is in those bytes
            });

            const response = await this.client.send(getObjectCommand);
            const buffer = await this.streamToBuffer(response.Body); // what does streamToBuffer do? for what streams bytes to buffer, any possibel optimizations?
            const metadata = await sharp(buffer).metadata();

            const filename = key.split('/').pop();
            const fullUrl = `${this.baseUrl}/${key}`;
            const mobileUrl = `https://api.momentkaph.sk/cloud_storage/${galleryType}/mobile/${filename}`;

            return {
              // i want to cache this too, not actual data of course, but the urls with dimensions
              fullUrl,
              mobileUrl,
              width: 0,
              height: 0,
              mobileWidth: Math.round(metadata.width / 3),
              mobileHeight: Math.round(metadata.height / 3),
            };
          } catch (error) {
            this.logger.error(`Error processing image ${key}:`, error);
            return {
              fullUrl: `${this.baseUrl}/${key}`,
              mobileUrl: `${this.baseUrl}/${key}`,
            };
          }
        })
      );

      return imagesWithDimensions;
    } catch (error) {
      this.logger.error('Error fetching images:', error);
      return [];
    }
  }

  async warmCache(galleryType: GalleryTypeEnum): Promise<any> {
    try {
      const fullCommand = new ListObjectsV2Command({
        Bucket: this.configService.get('BUCKET_NAME'),
        Prefix: `${galleryType}/full/`,
      });

      const fullResponse = await this.client.send(fullCommand);

      if (!fullResponse.Contents || fullResponse.Contents.length === 0) {
        this.logger.warn(`No images found for gallery type: ${galleryType}`);
        return { cached: 0 };
      }

      const fullImages = fullResponse.Contents
        .filter((item) => !item.Key.endsWith('/'))
        .map((item) => item.Key);

      // Instead of processing images here, make HTTP requests to the mobile endpoint
      // This way Nginx will cache the responses
      const cacheResults = await Promise.all(
        fullImages.map(async (key) => {
          try {
            const filename = key.split('/').pop();
            const mobileUrl = `http://localhost:${this.configService.get('PORT') || 3000}/cloud_storage/${galleryType}/mobile/${filename}`;

            // Make a request to our own mobile endpoint
            // Nginx sitting in front will cache this response
            const response = await fetch(mobileUrl);

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            this.logger.log(`Cached mobile version: ${filename}`);
            return { success: true, filename };
          } catch (error) {
            this.logger.error(`Error caching image ${key}:`, error);
            return { success: false, filename: key.split('/').pop() };
          }
        })
      );

      const successCount = cacheResults.filter(r => r.success).length;

      return {
        total: fullImages.length,
        cached: successCount,
        failed: fullImages.length - successCount,
      };
    } catch (error) {
      this.logger.error('Error warming cache:', error);
      throw error;
    }
  }

  async getMobileImage(
    galleryType: GalleryTypeEnum,
    filename: string,
  ): Promise<Buffer> {
    try {
      // Construct the S3 key for the full-size image
      const key = `${galleryType}/full/${filename}`;

      const getObjectCommand = new GetObjectCommand({
        Bucket: this.configService.get('BUCKET_NAME'),
        Key: key,
      });

      const response = await this.client.send(getObjectCommand);
      const buffer = await this.streamToBuffer(response.Body);

      // Get the original dimensions to calculate the resize ratio
      const metadata = await sharp(buffer).metadata();

      // Resize to 1/3 of original dimensions, maintaining aspect ratio
      const resizedBuffer = await sharp(buffer)
        .resize({
          width: Math.round(metadata.width / 3),
          fit: 'inside',
        })
        .toBuffer();

      this.logger.log(resizedBuffer);
      return resizedBuffer;
    } catch (error) {
      this.logger.error(
        `Error generating mobile image for ${galleryType}/${filename}:`,
        error
      );
      throw error;
    }
  }

  // Helper method to convert S3 stream to buffer -> need to understand this better
  private async streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}

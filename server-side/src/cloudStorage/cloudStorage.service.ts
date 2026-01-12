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
            // Fetch just enough of the image to read its header
            // The Range header requests only the first 10KB, which is typically
            // enough to read image metadata without downloading the full file
            const getObjectCommand = new GetObjectCommand({
              Bucket: this.configService.get('BUCKET_NAME'),
              Key: key,
              Range: 'bytes=0-10239', // First 10KB should be enough for headers
            });

            const response = await this.client.send(getObjectCommand);
            const buffer = await this.streamToBuffer(response.Body);
            const metadata = await sharp(buffer).metadata();

            const filename = key.split('/').pop();
            const fullUrl = `${this.baseUrl}/${key}`;
            const mobileUrl = `https://api.momentkaph.sk/cloud_storage/${galleryType}/mobile/${filename}`;

            return {
              fullUrl,
              mobileUrl,
              width: metadata.width,
              height: metadata.height,
            };
          } catch (error) {
            // If we fail to get dimensions for a specific image, log it but don't
            // fail the entire request. You could also set default dimensions here.
            this.logger.error(`Error processing image ${key}:`, error);

            // Return with default dimensions so the gallery still works
            return {
              fullUrl: `${this.baseUrl}/${key}`,
              mobileUrl: `${this.baseUrl}/${key.replace('/full/', '/mobile/')}`,
              width: 200, // fallback dimensions
              height: 200,
            };
          }
        })
      );

      return imagesWithDimensions;
    } catch (error) {
      this.logger.error('Error fetching images:', error);
      throw error;
    }
  }

  async fetchGalleryMobileImagesLinks(
    galleryType: GalleryTypeEnum): Promise<any> {
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

      

    } catch (error) {
      this.logger.error('Error fetching mobile images:', error);
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

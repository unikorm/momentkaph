import { Injectable, Logger } from '@nestjs/common';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import {
  GalleryTypeEnum,
  GetGallryImagesLinksResponseServerType,
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
  ): Promise<GetGallryImagesLinksResponseServerType[]> {
    try {
      const fullCommand = new ListObjectsV2Command({
        Bucket: this.configService.get('BUCKET_NAME'),
        Prefix: `${galleryType}/full/`,
      });

      const [fullResponse] = await Promise.all([this.client.send(fullCommand)]);

      if (!fullResponse.Contents || fullResponse.Contents.length === 0) {
        this.logger.warn(`No images found for gallery type: ${galleryType}`);
        return [];
      }

      const fullImages = (fullResponse.Contents || [])
        .filter((item) => !item.Key.endsWith('/'))
        .map((item) => ({
          fullUrl: `${this.baseUrl}/${item.Key}`,
        }));

      return fullImages.filter(Boolean);
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
}

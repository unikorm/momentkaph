import { Injectable, Logger } from '@nestjs/common';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import {
  GalleryTypeEnum,
  GetGallryImagesLinksResponseServerType,
} from './dtos';
import { BUCKET } from './dtos/secrets';

@Injectable()
export class CloudStorageService {
  private client: S3Client;
  private readonly baseUrl: string;
  private readonly logger = new Logger(CloudStorageService.name);

  constructor() {
    this.client = new S3Client({
      endpoint: BUCKET.endpoint,
      region: BUCKET.region,
      credentials: {
        accessKeyId: BUCKET.credentials.accessKeyId,
        secretAccessKey: BUCKET.credentials.secretAccessKey,
      },
    });

    this.baseUrl = `https://${BUCKET.name}.${BUCKET.region}.cdn.digitaloceanspaces.com`;
  }

  async fetchGalleryImagesLinks(
    galleryType: GalleryTypeEnum,
  ): Promise<GetGallryImagesLinksResponseServerType[]> {
    try {
      const fullCommand = new ListObjectsV2Command({
        Bucket: BUCKET.name,
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

import { Injectable } from '@nestjs/common';
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

  constructor() {
    this.client = new S3Client({
      endpoint: BUCKET.endpoint,
      region: BUCKET.region,
      credentials: {
        accessKeyId: BUCKET.credentials.accessKeyId,
        secretAccessKey: BUCKET.credentials.secretAccessKey,
      },
    });

    this.baseUrl = `https://${BUCKET.name}.${BUCKET.region}.digitaloceanspaces.com`;
  }

  async fetchGalleryImagesLinks(
    galleryType: GalleryTypeEnum,
  ): Promise<GetGallryImagesLinksResponseServerType> {
    try {
      const fullCommand = new ListObjectsV2Command({
        Bucket: BUCKET.name,
        Prefix: `${galleryType}/full/`,
      });
      const thumbnailCommand = new ListObjectsV2Command({
        Bucket: BUCKET.name,
        Prefix: `${galleryType}/thumbnails/`,
      });

      const [fullResponse, thumbnailResponse] = await Promise.all([
        this.client.send(fullCommand),
        this.client.send(thumbnailCommand),
      ]);

      const fullImages = (fullResponse.Contents || []).map((item) => ({
        fullUrl: `${this.baseUrl}/${item.Key}`,
      }));
      const thumbnails = (thumbnailResponse.Contents || []).map((item) => ({
        thumbnailUrl: `${this.baseUrl}/${item.Key}`,
      }));

      return {
        urls: fullImages.map((item, index) => ({
          ...item,
          ...thumbnails[index],
        })),
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
}

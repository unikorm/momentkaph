import { Injectable } from '@nestjs/common';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { GalleryTypeEnum } from './dtos';

@Injectable()
export class CloudStorageService {
  private client: S3Client;
  private readonly BUCKET = 'from secrets';

  constructor() {
    this.client = new S3Client({
      endpoint: 'from secrets',
      region: 'from secrets',
      credentials: {
        accessKeyId: 'from secrets',
        secretAccessKey: 'from secrets',
      },
    });
  }

  async fetchGalleryImagesLinks(galleryType: GalleryTypeEnum) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: 'from secrets',
        Prefix: `${galleryType}/`,
      });

      const response = await this.client.send(command);

      return (response.Contents || []).map((content) => ({
        url: 'from secrets', // `${this.client.config.endpoint}/${this.BUCKET}/${content.Key}`
        name: content.Key,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
}

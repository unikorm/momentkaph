import { Body, Controller, Post } from '@nestjs/common';
import { CloudStorageService } from './cloudStorage.service';
import {
  GalleryTypeEnum,
  PostGalleryTypeImageTypeResponseType,
} from './dtos';

@Controller('cloud_storage')
export class CloudStorageController {
  constructor(private readonly cloudStorageService: CloudStorageService) { }

  @Post()
  async fetchGalleryImagesLinks(
    @Body('galleryType') galleryType: GalleryTypeEnum,
  ): Promise<PostGalleryTypeImageTypeResponseType[]> {
    return await this.cloudStorageService.fetchGalleryImagesLinks(galleryType);
  }
}

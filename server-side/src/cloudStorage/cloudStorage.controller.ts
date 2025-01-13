import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CloudStorageService } from './cloudStorage.service';
import {
  GalleryTypeEnum,
  PostGalleryTypeImageTypeResponseType,
} from './dtos';
import { CacheHeaderInterceptor } from 'src/interceptors/cache.interceptor';

@Controller('cloud_storage')
@UseInterceptors(CacheHeaderInterceptor)
export class CloudStorageController {
  constructor(private readonly cloudStorageService: CloudStorageService) { }

  @Post()
  async fetchGalleryImagesLinks(
    @Body('galleryType') galleryType: GalleryTypeEnum,
  ): Promise<PostGalleryTypeImageTypeResponseType[]> {
    return await this.cloudStorageService.fetchGalleryImagesLinks(galleryType);
  }
}

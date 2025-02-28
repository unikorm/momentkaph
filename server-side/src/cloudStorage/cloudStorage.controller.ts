import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
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

  @Get(':galleryType')
  async fetchGalleryImagesLinks(
    @Param('galleryType') galleryType: GalleryTypeEnum,
  ): Promise<PostGalleryTypeImageTypeResponseType[]> {
    return await this.cloudStorageService.fetchGalleryImagesLinks(galleryType);
  }
}

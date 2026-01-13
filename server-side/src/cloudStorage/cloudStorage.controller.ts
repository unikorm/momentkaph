import { Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
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

  @Get(':galleryType/mobile/:filename')
  async serveMobileImage(
    @Param('galleryType') galleryType: GalleryTypeEnum,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const imageBuffer = await this.cloudStorageService.getMobileImage(
      galleryType,
      filename
    );

    // Set appropriate headers for image serving and caching
    res.set({
      'Content-Type': 'image/avif',
      'Cache-Control': 'public, max-age=31536000, immutable',
    });

    return res.send(imageBuffer);
  }

  @Get(':galleryType/warm_cache')
  async warmCache(
    @Param('galleryType') galleryType: GalleryTypeEnum,
  ): Promise<PostGalleryTypeImageTypeResponseType[]> {
    return await this.cloudStorageService.warmCache(galleryType);
  }
}

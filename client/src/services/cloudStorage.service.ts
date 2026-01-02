import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  GalleryTypeEnum,
  PostGalleryTypeImageTypeResponseType
} from '../shared/dtos';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudStorageService {
  readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchGalleryImagesLinks(
    galleryType: GalleryTypeEnum
  ): Observable<PostGalleryTypeImageTypeResponseType[]> {
    return this.http.get<PostGalleryTypeImageTypeResponseType[]>(
      `${this.apiUrl}/cloud_storage/${galleryType}`
    ).pipe(
      // Calculate aspect ratio for easier CSS handling
      map(images => images.map(img => ({
        ...img,
        aspectRatio: img.width / img.height
      })))
    );
  }
}

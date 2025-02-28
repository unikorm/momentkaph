import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GalleryTypeEnum,
  GetGallryImagesLinksResponseType,
} from '../shared/dtos';

@Injectable({
  providedIn: 'root',
})
export class CloudStorageService {
  readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000'; // use environment variables

  fetchGalleryImagesLinks(
    galleryType: GalleryTypeEnum
  ): Observable<GetGallryImagesLinksResponseType[]> {
    return this.http.post<GetGallryImagesLinksResponseType[]>(
      `${this.apiUrl}/cloud_storage`,
      { galleryType: galleryType }
    );
  }
}

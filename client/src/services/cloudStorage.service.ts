import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GalleryTypeEnum,
  PostGallryImageLinkResponseType,
  httpHeader,
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
  ): Observable<PostGallryImageLinkResponseType[]> {
    console.log(httpHeader);
    return this.http.post<PostGallryImageLinkResponseType[]>(
      `${this.apiUrl}/cloud_storage`,
      { galleryType: galleryType },
      httpHeader // ??
    );
  }
}

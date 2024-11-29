export type GalleryTypeImagesType = {
  fullUrl: string;
  thumbnailUrl: string;
};

export enum GalleryTypeEnum {
  WEDDINGS = 'weddings',
  PORTRAIT = 'portrait',
  'LOVE-STORY' = 'love-story',
  FAMILY = 'family',
  STUDIO = 'studio',
  PREGNANCY = 'pregnancy',
  BAPTISM = 'baptism',
}

export type GetGallryImagesLinksResponseServerType = {
  fullUrl: string;
  thumbnailUrl: string;
};

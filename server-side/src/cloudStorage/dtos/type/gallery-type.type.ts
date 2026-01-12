export enum GalleryTypeEnum {
  WEDDINGS = 'weddings',
  PORTRAIT = 'portrait',
  'LOVE-STORY' = 'love-story',
  FAMILY = 'family',
  STUDIO = 'studio',
  PREGNANCY = 'pregnancy',
  BAPTISM = 'baptism',
  NEWBORN = 'newborn',
}

export type PostGalleryTypeImageTypeResponseType = {
  fullUrl: string;
  mobileUrl: string;
  width: number;
  height: number;
};

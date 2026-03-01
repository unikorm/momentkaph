export type GalleryTypeImageType = {
  fullUrl: string;
  mobileUrl: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  aspectRatio?: number;
};

export type DisplayImage = {
  url: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // precomputed for convenience
  originalFullUrl: string; // keep for tracking identity
};

export enum GalleryTypeEnum {
  WEDDINGS = 'weddings',
  PORTRAIT = 'portrait',
  'LOVE-STORY' = 'love-story',
  FAMILY = 'family',
  STUDIO = 'studio',
  PREGNANCY = 'pregnancy',
  BAPTISM = 'baptism',
  BABIES = 'babies',
  NEWBORN = 'newborn',
}

export type PostGalleryTypeImageTypeResponseType = {
  fullUrl: string;
  mobileUrl: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  aspectRatio?: number;
};

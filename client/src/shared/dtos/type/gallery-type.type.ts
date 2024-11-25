export type GalleryTypeImagesType = {
  urls: {
    fullUrl: string;
    thumbnailUrl: string;
  }[];
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

export type GetGallryImagesLinksResponseType = {
  urls: {
    fullUrl: string;
    thumbnailUrl: string;
  }[];
};

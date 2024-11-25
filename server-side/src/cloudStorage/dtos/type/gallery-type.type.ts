export type GalleryTypeImageServerType = {
  url: string;
  thumbnailUrl: string;
  description?: string;
};

export type GalleryTypePageServerType = {
  title: string;
  description: string;
  images: GalleryTypeImageServerType[];
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

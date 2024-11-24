export type GalleryTypeImage = {
  url: string;
  thumbnailUrl: string;
  description?: string;
};

export type GalleryTypePage = {
  title: string;
  description: string;
  images: GalleryTypeImage[];
};

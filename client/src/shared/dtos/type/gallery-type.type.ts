export type GalleryTypeImage = {
  url: string;
  title: string;
  description?: string;
};

export type GalleryTypePage = {
  title: string;
  description: string;
  images: GalleryTypeImage[];
};

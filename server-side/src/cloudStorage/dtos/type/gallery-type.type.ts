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

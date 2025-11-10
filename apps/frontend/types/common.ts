export interface StyleProps {
  background?: string;
  textColor?: string;
}

export interface JustifiedGalleryProps  {
  images: MultiFormatImageUrl[];
  baseUrl: string;
}
export interface MultiFormatImageUrl {
  resizedUrl: string;
  url: string;
}


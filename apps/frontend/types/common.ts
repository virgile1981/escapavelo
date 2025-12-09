import type { MultiFormatImageUrl } from "@escapavelo/shared-types";

export interface StyleProps {
  background?: string;
  textColor?: string;
}

export interface JustifiedGalleryProps {
  images: MultiFormatImageUrl[];
  baseUrl: string;
}

import { Status } from "@escapavelo/shared-types";
import { MultiFormatImageUrl } from "./common"

export type BlogAttribute = keyof BlogPost;
export type BlogAttributesTypes = BlogPost[BlogAttribute];
export type FullBlogPost = BlogPost & {id: string}

export class BlogPost {
  id?: string;
  title: string;
  slug: string
  excerpt: string;
  content: string;
  imageUrl: MultiFormatImageUrl | null;
  status: Status;
  date?: string;

  constructor() {
    this.title = '';
    this.slug = '';
    this.excerpt = '';
    this.content = '';
    this.status = 'draft';
    this.imageUrl = null;
  }
}
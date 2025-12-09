import { type MultiFormatImageUrl, type PersitedDatedObject, type Status } from "@escapavelo/shared-types";
import { create } from "domain";

export type BlogAttribute = keyof BlogPost;
export type BlogAttributesTypes = BlogPost[BlogAttribute];
export type FullBlogPost = BlogPost & { id: string }

export class BlogPost implements PersitedDatedObject {
  id?: string;
  title: string;
  slug: string
  excerpt: string;
  content: string;
  imageUrl: MultiFormatImageUrl | null;
  status: Status;
  date?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor() {
    this.title = '';
    this.slug = '';
    this.excerpt = '';
    this.content = '';
    this.status = 'draft';
    this.imageUrl = null;
  }
}
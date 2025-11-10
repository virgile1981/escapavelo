import { MultiFormatImageUrl } from "./common"

export type PostStatus = 'draft' | 'published';

export type BlogAttribute = keyof BlogPost;

export class BlogPost {
  id?: string;
  title: string;
  slug: string
  excerpt: string;
  content: string;
  imageUrl: MultiFormatImageUrl | null;
  status: PostStatus;
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
export type Status = 'draft' | 'published'
export type Context = 'blog' | 'destination'
export type Locale = 'fr' | 'en';

export interface PersitedDatedObject {
    createdAt?: string;
    updatedAt?: string;
}

export interface MultiFormatImageUrl {
    resizedUrl: string;
    url: string;
}
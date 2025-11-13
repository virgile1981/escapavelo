
import { Context } from '@escapavelo/shared-types';
import { PUBLIC_UPLOADED_BLOG_IMAGES_URL, PUBLIC_UPLOADED_DESTINATION_IMAGES_URL } from './config';
    
    export function getImagesUrl(context: Context){
     return context === 'blog'
        ? PUBLIC_UPLOADED_BLOG_IMAGES_URL
        : PUBLIC_UPLOADED_DESTINATION_IMAGES_URL;
    }
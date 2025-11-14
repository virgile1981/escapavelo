
import { Context } from '@escapavelo/shared-types';
    
    export function getImageUrl(context: Context){
     return context === 'blog'
        ? process.env.NEXT_PUBLIC_UPLOADED_BLOG_IMAGES_URL
        : process.env.NEXT_PUBLIC_UPLOADED_DESTINATION_IMAGES_URL;
    }
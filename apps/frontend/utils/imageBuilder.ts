import { Context } from "@escapavelo/shared-types";

    export function serverImageUrlBuilder(context: Context){
     return  process.env.NEXT_PUBLIC_SERVER_UPLOADED_IMAGES_URL + "/"+ context
    }

    export function publicImageUrlBuilder(context: Context){
     return process.env.NEXT_PUBLIC_CLIENT_UPLOADED_IMAGES_URL + "/"+ context
    }
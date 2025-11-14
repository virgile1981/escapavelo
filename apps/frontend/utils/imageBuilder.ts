import { Context } from "@escapavelo/shared-types";

    export function serverImageUrlBuilder(context: Context){
     return "http://localhost/images" + "/"+ context
    }

    export function publicImageUrlBuilder(context: Context){
     return process.env.CLIENT_UPLOADED_IMAGES_URL + "/"+ context
    }
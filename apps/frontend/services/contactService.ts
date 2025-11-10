import type { FormData, SubscriberNewsletter } from "../types/contact";

export class ContactService {
   private baseUrl = process.env.NEXT_PUBLIC_API_URL + '/contact'

   
   async subscribe(subscriber: SubscriberNewsletter): Promise<string> {

    const response = await fetch(`${this.baseUrl}/subscribe`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriber)
    })
    return response.json()
   }

   async sendEmail(form: FormData): Promise<string> {
      
      const response =  await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },  
            body: JSON.stringify(form)
      })

      return response.json()
   }
}
// utils/data.ts

import { Destination } from "@/types/destination";

// Fonction asynchrone qui récupère les données
export async function fetchRegions(): Promise<string[]> {
       
       const baseUrl = process.env.NEXT_PUBLIC_BUILD_SSG_URL + '/trips'
       const response = await fetch(`${baseUrl}`) 
       if (!response.ok) {
              throw new Error('Erreur lors de la récupération du voyage')
       }
       const allTravels = await response.json();
       return allTravels.map((t: Destination) => t.region)
}
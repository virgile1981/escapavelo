import { type Status } from "@escapavelo/shared-types"
import { type CreatedDestination, Destination } from "../types/destination"
import { API_URL } from "@/utils/urlBuilder"

class DestinationService {

  private baseUrl = API_URL + '/trips'

  async getDestination(id: string): Promise<Destination> {
    const response = await fetch(`${this.baseUrl}/id/${id}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du voyage')
    }
    return response.json()
  }


  async getDestinationBySlug(slug: string): Promise<Destination> {
    const response = await fetch(`${this.baseUrl}/${slug}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du voyage')
    }
    return response.json()
  }
  

  async updateTrip(id: string, trip: Destination): Promise<Destination> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip)
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde du voyage')
    }

    return response.json()
  }

  async getAllTrips(status?: Status): Promise<CreatedDestination[]> {
    const statusQuery = status ? `?status=${status}` : ''

    const response = await fetch(`${this.baseUrl}${statusQuery}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des voyages')
    }
    return response.json()
  }

  async getPromotedTrips(): Promise<Destination[]> {
    const response = await fetch(this.baseUrl + '?promoted=true')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des voyages')
    }
    return response.json()
  }

  async createTrip(trip: Destination): Promise<Destination> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip)
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création du voyage')
    }

    return response.json()
  }


  async deleteTrip(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE', credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du voyage')
    }
  }
}

export const destinationService = new DestinationService()
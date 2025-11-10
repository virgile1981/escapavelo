import { CreatedDestination, Destination } from "../types/trip"

export class DestinationService {

  private baseUrl = process.env.NEXT_PUBLIC_API_URL + '/trips'

  async getTrip(id: string): Promise<Destination> {
    const response = await fetch(`${this.baseUrl}/${id}`)
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

  async getAllTrips(): Promise<CreatedDestination[]> {
    const response = await fetch(this.baseUrl)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des voyages')
    }
    return response.json()
  }

  async getPromotedTrips(): Promise<Destination[]> {
    console.log(this.baseUrl)
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
import { DestinationDTO, FlattenDestination, type FlattenDestinationWithId, type Locale, type Status } from "@escapavelo/shared-types"
import { API_URL, DestinationApiUrl } from "@/utils/urlBuilder"

class DestinationService {

  private baseUrl = API_URL + '/trips'

  async getDestination(id: string): Promise<DestinationDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du voyage')
    }
    return response.json()
  }

  async getDestinationBySlug(locale: Locale, slug: string): Promise<FlattenDestination> {
    const response = await fetch(`${DestinationApiUrl(locale)}/${slug}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du voyage')
    }
    return response.json()
  }

  async updateTrip(id: string, trip: DestinationDTO): Promise<DestinationDTO> {
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

  async getAllTrips(locale: Locale, status?: Status): Promise<FlattenDestination[]> {
    const statusQuery = status ? `?status=${status}` : ''
    console.log("getAllTrips", `${DestinationApiUrl(locale)}${statusQuery}`);
    const response = await fetch(`${DestinationApiUrl(locale)}${statusQuery}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des voyages')
    }
    return response.json()
  }

  async getPromotedTrips(locale: Locale): Promise<FlattenDestination[]> {
    const response = await fetch(DestinationApiUrl(locale) + '?promoted=true')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des voyages')
    }
    return response.json()
  }

  async getAllTripsWithId(locale: Locale, status?: Status): Promise<FlattenDestinationWithId[]> {
    const statusQuery = status ? `?status=${status}` : ''

    const response = await fetch(`${DestinationApiUrl(locale)}?with_id=true${statusQuery}&allowEmptyTranslation=true`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des voyages')
    }
    return response.json()
  }

  async createTrip(trip: DestinationDTO): Promise<DestinationDTO> {
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
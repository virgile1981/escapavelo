import { type DifficultyType, type DurationType, type Status, type TravelType } from "@escapavelo/shared-types";
import { type MultiFormatImageUrl } from "./common"
export type NewDestination = Omit<Destination, "id">;
export type CreatedDestination = Destination & { id: number };
export type DestinationAttribute = keyof Destination;

export class Destination {
  id?: number
  promoted: boolean
  title: string
  slug: string
  region: string
  duration: number
  description: string
  price: number
  longDescription: string
  imageUrl: MultiFormatImageUrl | null
  imageUrls: MultiFormatImageUrl[]
  status: Status
  difficulty: DifficultyType
  distance: number
  included: string[]
  notIncluded: string[]
  program: TripDay[]
  createdAt?: string
  updatedAt?: string
  travelType?: TravelType

  constructor() {
    this.promoted = false
    this.title = ''
    this.slug = ''
    this.region = ''
    this.duration = 0
    this.description = ''
    this.price = 0
    this.longDescription = ''
    this.imageUrl = null
    this.imageUrls = []
    this.status = 'draft'
    this.difficulty = 'facile'
    this.distance = 0
    this.included = []
    this.notIncluded = []
    this.program = []
  }
}

export interface TripDay {
  day: number
  title: string
  description: string
  distance: number
  accommodation?: string
}

// Search definitions
export type SearchFilters = {
  region?: string,
  duration?: DurationType,
  difficulty?: DifficultyType,
  maxPrice?: string,
  search?: string
}
export const defaultSearchFilters: SearchFilters = {
  region: undefined,
  duration: undefined,
  difficulty: undefined,
  maxPrice: undefined,
  search: undefined,
};
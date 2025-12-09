import { Locale, MultiFormatImageUrl, PersitedDatedObject, Status } from "./common.type";

export type TravelType = 'family' | 'couple' | 'friends';
export type DifficultyType = "easy" | "moderate" | "difficult"
export type DurationType = 'weekend' | 'weekend+' | 'week' | 'extended';
export type PriceType = 'until300' | 'until500' | 'until800' | 'morethan1000';

export const DurationRecord: Record<DurationType, number> =
    { weekend: 2, "weekend+": 4, week: 7, extended: 99 };

export const DifficultyRecord: Record<DifficultyType, number> =
    { easy: 1, moderate: 2, difficult: 3 }

export const PriceRecord: Record<PriceType, number> =
    { until300: 300, until500: 500, until800: 800, morethan1000: 1000 };

export type DestinationWithId = DestinationDTO & { id: number };
export type DestinationAttribute = keyof DestinationDTO;
export type FlattenDestinationWithId = FlattenDestination & { id: number };

export class DestinationTranslation implements PersitedDatedObject {
    createdAt?: string
    updatedAt?: string
    locale: string
    title: string
    slug: string
    region: string
    description: string
    longDescription: string
    included: string[]
    notIncluded: string[]
    program: TripDay[]

    constructor(locale: Locale = "fr") {
        this.locale = locale
        this.title = ''
        this.slug = ''
        this.region = ''
        this.description = ''
        this.longDescription = ''
        this.included = []
        this.notIncluded = []
        this.program = []
    }
}

export class FlattenDestination extends DestinationTranslation implements PersitedDatedObject {
    id?: number
    travelType: TravelType
    locale: string
    promoted: boolean
    duration: number
    price: number
    imageUrl: MultiFormatImageUrl | null
    imageUrls: MultiFormatImageUrl[]
    status: Status
    difficulty: DifficultyType
    distance: number

    constructor() {
        super()
        this.locale = 'fr'
        this.travelType = "family"
        this.promoted = false
        this.duration = 0
        this.price = 0
        this.imageUrl = null
        this.imageUrls = []
        this.status = 'draft'
        this.difficulty = 'easy'
        this.distance = 0
    }
}

export class DestinationDTO implements PersitedDatedObject {
    id?: number
    createdAt?: string
    updatedAt?: string
    travelType: TravelType
    promoted: boolean
    duration: number
    price: number
    imageUrl: MultiFormatImageUrl | null
    imageUrls: MultiFormatImageUrl[]
    difficulty: DifficultyType
    distance: number
    translations: DestinationTranslation[];
    status: Status;
    constructor(locale: Locale) {
        this.promoted = false
        this.duration = 0
        this.price = 0
        this.imageUrl = null
        this.imageUrls = []
        this.difficulty = 'easy'
        this.travelType = "family"
        this.distance = 0
        this.status = "draft"
        this.translations = [new DestinationTranslation(locale)]
    }
}

export interface TripDay {
    day: number
    title: string
    description: string
    distance: number
    accommodation?: string
}
import { Status, TravelType } from '@escapavelo/shared-types';
import { Image } from '@root/common/dto/image.dto';
export interface DayTrip {
  day: number;
  description: string;
  distance: number; 
  accommodation: string;
  title: string;
}

export interface Trip {
  id: number;
  promoted: boolean;
  title: string;
  description: string;
  difficulty: number;
  travelType: 'family' | 'couple' | 'friends';
  duration: number;
  price: number;
  status: Status;
  imageUrl: string;
  included?: string[];
  notIncluded?: string[];
  program?: DayTrip[];
  imageUrls: Image[];
}

export class CreateTripDto {
  promoted: boolean;
  title: string;
  description: string;
  difficulty: number;
  travelType: TravelType;
  duration: number;
  price: number;
  status: Status;
  imageUrl: string;
  longDescription?: string;
  included?: string[];
  notIncluded?: string[];
  program?: DayTrip[];
  imageUrls: Image[];
}

export class UpdateTripDto {
  promoted?: boolean;
  title?: string;
  description?: string;
  difficulty?: number;
  travelType?: TravelType;
  duration?: number;
  price?: number;
  imageUrl?: string;
  status: Status;
  longDescription?: string;
  included?: string[];
  notIncluded?: string[];
  program?: DayTrip[];
  imageUrls: Image[];
}
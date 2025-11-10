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
  status: 'draft' | 'published';
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
  travelType: 'family' | 'couple' | 'friends';
  duration: number;
  price: number;
  status: 'draft' | 'published';
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
  travelType?: 'family' | 'couple' | 'friends';
  duration?: number;
  price?: number;
  imageUrl?: string;
  status: 'draft' | 'published';
  longDescription?: string;
  included?: string[];
  notIncluded?: string[];
  program?: DayTrip[];
  imageUrls: Image[];
}
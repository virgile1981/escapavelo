export type TravelType = 'family' | 'couple' | 'friends';
export type DifficultyType = "facile" | "moderee" | "difficile"
export type DurationType = 'courte' | 'moderee' | 'semaine' | 'prolongee';
export type PriceType = 'until300' | 'until500' | 'until800' | 'morethan1000';

export const DurationRecord: Record<DurationType, number> =
    { courte: 2, moderee: 4, semaine: 7 , prolongee: 99 };

export const DifficultyRecord: Record<DifficultyType, number> = 
    { facile: 1, moderee: 2, difficile:3 }

export const PriceRecord: Record<PriceType, number>  =
    { until300: 300, until500: 500, until800: 800, morethan1000: 1000 };
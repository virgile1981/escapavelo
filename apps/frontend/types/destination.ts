import type { DurationType, DifficultyType } from "@escapavelo/shared-types";

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
'use client'
import { defaultSearchFilters, type SearchFilters } from "@/types/destination";
import { DurationRecord, DifficultyRecord, PriceRecord } from "@escapavelo/shared-types";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"

interface SearchFormProps {
    onSubmit: (filters: SearchFilters) => void
    regionsList: string[]
    filters?: SearchFilters
    shownFilters?: (keyof SearchFilters)[]
}

export default function DestinationSearchForm({ onSubmit, regionsList, filters: filterValues, shownFilters }: SearchFormProps) {
    const t = useTranslations('searchDestination');

    const [searchFilters, setSearchFilters] = useState<SearchFilters>(filterValues || {})
    const filtersToDisplay = shownFilters ? shownFilters : Object.keys(defaultSearchFilters)

    useEffect(() => {
        setSearchFilters(() => filterValues || {})
    }, [filterValues])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(searchFilters)
    };

    const handleChange = (field: keyof SearchFilters, value: string) => {
        setSearchFilters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSearch} className="space-y-6 w-full">

            <div className="grid md:grid-cols-3 gap-4">

                {/* Région */}
                {filtersToDisplay.includes("region") && (
                    <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">{t('region')}</label>
                        <select
                            id="region"
                            value={searchFilters.region ?? "default"}
                            onChange={e => handleChange("region", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="default">{t('allRegions')}</option>
                            {regionsList.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Durée */}
                {filtersToDisplay.includes("duration") && (
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">{t('durationLabels.duration')}</label>
                        <select
                            id="duration"
                            value={searchFilters.duration ?? "default"}
                            onChange={(e) => handleChange("duration", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="default">{t('durationLabels.allDurations')}</option>
                            {Object.keys(DurationRecord).map(key => (
                                <option key={key} value={key}>{t('durationLabels.' + key)}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Difficulté */}
                {filtersToDisplay.includes("difficulty") && (
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">{t('difficultyLevel')}</label>
                        <select
                            id="difficulty"
                            value={searchFilters.difficulty ?? "default"}
                            onChange={(e) => handleChange("difficulty", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="default">{t('difficultyLabels.allDifficulties')}</option>
                            {Object.keys(DifficultyRecord).map(key => (
                                <option key={key} value={key}>{t('difficultyLabels.' + key)}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Prix max */}
                {filtersToDisplay.includes("maxPrice") && (
                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">{t('priceLabels.maxPrice')}</label>
                        <select
                            id="maxPrice"
                            value={searchFilters.maxPrice ?? "default"}
                            onChange={(e) => handleChange("maxPrice", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="default">{t('priceLabels.allPrices')}</option>
                            {Object.keys(PriceRecord).map(key => (
                                <option key={key} value={key}>{t('priceLabels.' + key)}</option>
                            ))}
                        </select>
                    </div>
                )}

            </div>

            {/* Recherche textuelle */}
            {filtersToDisplay.includes("search") && (
                <div>
                    <label htmlFor="searchByWords" className="block text-sm font-medium text-gray-700 mb-2">{t('freeSearch')}</label>
                    <div className="relative">
                        <input
                            id="searchByWords"
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchFilters.search}
                            onChange={e => handleChange("search", e.target.value)}
                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            )}

            {/* Bouton */}
            <div className="flex justify-between items-center">
                <button type="submit" className="bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition-colors">
                    {t('searchButton')}
                </button>
            </div>
        </form>
    )
}

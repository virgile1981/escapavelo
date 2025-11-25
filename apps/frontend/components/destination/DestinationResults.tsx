'use client'

import { Destination, type SearchFilters } from "@/types/destination"
import { DurationRecord, DifficultyRecord } from "@escapavelo/shared-types"
import { useEffect, useMemo, useState } from "react"
import DestinationSearchForm from "./DestinationSearchForm"
import { MapPin } from "lucide-react"
import DestinationCard from "./DestinationCard"
import { useSearchParams } from "next/navigation"

interface DestinationResultsProps {
    regions: string[];
    destinations: Destination[];
}
export function DestinationResults({ regions, destinations }: DestinationResultsProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const searchParams = useSearchParams();
    const itemsPerPage = 12
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({})

    useEffect(() => {
        const params: SearchFilters = Object.fromEntries(searchParams.entries());
        setSearchFilters(() => params)
    }, [])

    const handleSearch = (filters: SearchFilters) => {
        setSearchFilters(filters);
    }

    const filteredDestinations = useMemo(() => {
        return destinations.filter(d => {
            if (searchFilters.region && d.region !== searchFilters.region) return false
            if (searchFilters.difficulty && d.difficulty !== searchFilters.difficulty) return false
            if (searchFilters.maxPrice && d.price > parseInt(searchFilters.maxPrice)) return false

            if (searchFilters.duration) {
                const dur = d.duration
                const range = searchFilters.duration
                if (DurationRecord[range] >= dur) return false
            }

            if (searchFilters.search) {
                const s = searchFilters.search.toLowerCase()
                const text = [d.title, d.region, d.description]
                    .join(' ')
                    .toLowerCase()
                if (!text.includes(s)) return false
            }

            return true
        })
    }, [destinations, searchFilters])

    const sortedDestinations = useMemo(() => {
        const sorted = [...filteredDestinations]
        switch (sortBy) {
            case 'price':
                return sorted.sort((a, b) => a.price - b.price)
            case 'duration':
                return sorted.sort((a, b) => a.duration - b.duration)
            case 'difficulty':
                return sorted.sort((a, b) => DifficultyRecord[a.difficulty] - DifficultyRecord[b.difficulty])
            default:
                return sorted.sort((a, b) => a.title.localeCompare(b.title))
        }
    }, [filteredDestinations, sortBy])

    const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)

    const resetFilters = () => {
        setSearchFilters({})
        setSortBy('title')
        setCurrentPage(1)
    }

    // Pagination (facultative)
    const displayed = sortedDestinations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className="pt-24">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos destinations</h1>
                    <p className="text-xl text-gray-600">
                        Découvrez nos circuits à vélo à travers la France
                    </p>
                </div>

                {/* --- FORMULAIRE --- */}
                <div className="bg-white shadow-md p-6 mb-12">
                    <DestinationSearchForm regionsList={regions} filters={searchFilters} onSubmit={handleSearch}></DestinationSearchForm>
                </div>

                {displayed.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <MapPin className="mx-auto h-16 w-16 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Aucune destination trouvée</h3>
                        <p>Essayez de modifier vos critères de recherche</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 bg-green-900 text-white px-6 py-3 hover:bg-green-800"
                        >
                            Voir toutes les destinations
                        </button>
                    </div>
                )}

                {/* --- LISTE --- */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayed.map(destination => (
                        <DestinationCard key={destination.id} destination={destination}></DestinationCard>
                    ))}
                </div>

                {/* --- PAGINATION --- */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg ${currentPage === page
                                    ? 'bg-green-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
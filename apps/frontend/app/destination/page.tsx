'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import DifficultyIndicator from '@/components/shared/DifficultyIndicator'
import { DestinationService } from '@/services/destinationService'
import { Destination } from '@/types/trip'
import DestinationCard from '@/components/destination/DestinationCard'

export default function DestinationsPage() {
  const travelService = new DestinationService()

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('title')

  const itemsPerPage = 12
  const [searchFilters, setSearchFilters] = useState({
    region: '',
    duration: '',
    difficulty: '',
    maxPrice: '',
    search: '',
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const allTravels = await travelService.getAllTrips()
        setDestinations(allTravels.filter((t: Destination) => t.status === 'published'))
      } catch (err) {
        console.error(err)
        setError('Erreur lors du chargement des destinations')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const availableRegions = useMemo(() => {
    return Array.from(new Set(destinations.map(d => d.region))).sort()
  }, [destinations])

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => {
      if (searchFilters.region && d.region !== searchFilters.region) return false
      if (searchFilters.difficulty && d.difficulty > parseInt(searchFilters.difficulty)) return false
      if (searchFilters.maxPrice && d.price > parseInt(searchFilters.maxPrice)) return false

      if (searchFilters.duration) {
        const dur = d.duration
        const range = searchFilters.duration
        if (range === '1-2' && (dur < 1 || dur > 2)) return false
        if (range === '3-4' && (dur < 3 || dur > 4)) return false
        if (range === '5-7' && (dur < 5 || dur > 7)) return false
        if (range === '8+' && dur < 8) return false
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
        const order: Record<string, number> = { facile: 1, modéré: 2, difficile: 3 }
        return sorted.sort((a, b) => order[a.difficulty] - order[b.difficulty])
      default:
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
    }
  }, [filteredDestinations, sortBy])

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)

  const resetFilters = () => {
    setSearchFilters({ region: '', duration: '', difficulty: '', maxPrice: '', search: '' })
    setSortBy('title')
    setCurrentPage(1)
  }

  const handleChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }))
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
          <form
            onSubmit={e => {
              e.preventDefault()
              setCurrentPage(1)
            }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Région */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
                <select
                  value={searchFilters.region}
                  onChange={e => handleChange('region', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Toutes les régions</option>
                  {availableRegions.map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Durée */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                <select
                  value={searchFilters.duration}
                  onChange={e => handleChange('duration', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Toutes les durées</option>
                  <option value="1-2">1-2 jours</option>
                  <option value="3-4">3-4 jours</option>
                  <option value="5-7">5-7 jours</option>
                  <option value="8+">8+ jours</option>
                </select>
              </div>

              {/* Difficulté */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                <select
                  value={searchFilters.difficulty}
                  onChange={e => handleChange('difficulty', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Toutes les difficultés</option>
                  <option value="1">Facile</option>
                  <option value="2">Modéré</option>
                  <option value="3">Difficile</option>
                </select>
              </div>

              {/* Prix max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix maximum</label>
                <select
                  value={searchFilters.maxPrice}
                  onChange={e => handleChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Tous les prix</option>
                  <option value="300">Jusqu’à 300€</option>
                  <option value="500">Jusqu’à 500€</option>
                  <option value="800">Jusqu’à 800€</option>
                  <option value="1000">Jusqu’à 1000€</option>
                </select>
              </div>
            </div>

            {/* Recherche textuelle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recherche libre</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher par nom, région, description..."
                  value={searchFilters.search}
                  onChange={e => handleChange('search', e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={resetFilters}
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Réinitialiser les filtres
              </button>
              <button
                type="submit"
                className="bg-green-900 text-white px-6 py-2 hover:bg-green-800 transition-colors"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>

        {/* --- ÉTATS --- */}
        {loading && <p className="text-center text-gray-600 py-12">Chargement...</p>}

        {error && (
          <div className="text-center text-red-600 py-12">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-green-900 text-white px-4 py-2 hover:bg-green-800"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && displayed.length === 0 && (
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

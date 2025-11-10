'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CreatedDestination, Destination } from '@/types/trip'
import { DestinationService } from '@/services/destinationService'


export default function TripAdminPage() {
    const [destinations, setDestinations] = useState<CreatedDestination[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const destinationService = new DestinationService()
    const loadTravels = async () => {
        try {
            setLoading(true)
            setError('')
            const data = await destinationService.getAllTrips()
            setDestinations(data)
        } catch (err) {
            console.error('Erreur :', err)
            setError('Erreur lors du chargement des voyages')
        } finally {
            setLoading(false)
        }
    }

    const deleteTravel = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) return

        try {
            setDeletingId(id)
            await destinationService.deleteTrip(id)
            setDestinations((prev) => prev.filter((t) => t.id !== id))
        } catch (err) {
            console.error('Erreur :', err)
            alert('Erreur lors de la suppression du voyage')
        } finally {
            setDeletingId(null)
        }
    }

    useEffect(() => {
        loadTravels()
    }, [])

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Chargement des voyages...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={loadTravels}
                    className="mt-4 bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                >
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Gestion des voyages</h2>
                <Link
                    href="/admin/destination/create"
                    className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                    Nouveau voyage
                </Link>
            </div>

            {destinations.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Aucun voyage créé pour le moment</p>
                    <Link
                        href="/admin/destination/create"
                        className="inline-flex items-center bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800"
                    >
                        Créer le premier voyage
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Voyage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Région
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durée
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prix
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {destinations.map((destination) => (
                                <tr key={destination.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {destination.title}
                                                </div>
                                                <div className="text-sm text-gray-500">{destination.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {destination.region}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {destination.duration}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {destination.price}€
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${destination.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {destination.status === 'published' ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href={`/admin/destination/${destination.id}`}
                                            className="text-green-900 hover:text-green-700 mr-4"
                                        >
                                            Modifier
                                        </a>
                                        <button
                                            onClick={() => deleteTravel(destination.id)}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={deletingId === destination.id}
                                        >
                                            {deletingId === destination.id ? 'Suppression...' : 'Supprimer'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

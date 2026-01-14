'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { destinationService } from '@/services/destinationService'
import type { FlattenDestinationWithId, Locale } from '@escapavelo/shared-types'
import { notFound, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'


export default function TripAdminPage() {
    const params = useParams()
    if (Array.isArray(params.locale)) {
        notFound();
    }
    const t = useTranslations('destination');
    const locale = params.locale as Locale;
    const [destinations, setDestinations] = useState<FlattenDestinationWithId[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const loadTravels = async () => {
        try {
            setLoading(true)
            setError('')
            const data = await destinationService.getAllTripsWithId(locale)
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
                <p className="text-gray-600">{t("tripsLoading")}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={() => loadTravels()}
                    className="mt-4 bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                >
                    {t("retryButton")}
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{t("tripAdministrationTitle")}</h2>
                <Link
                    href="/admin/destination/create"
                    className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                    {t("createNewTravelButton")}
                </Link>
            </div>

            {destinations.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">{t("infoNoTrip")}</p>
                    <Link
                        href="/admin/destination/create"
                        className="inline-flex items-center bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800"
                    >
                        {t("createFirstTravelButton")}
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("columnTravel")}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("columnRegion")}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("columnDuration")}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("columnPrice")}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("columnStatus")}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("columnActions")}
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
                                                    {destination.title || t("notDefined")}
                                                </div>
                                                <div className="text-sm text-gray-500">{destination.slug || t("notDefined")}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {destination.region || t("notDefined")}
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
                                            {destination.status === 'published' ? t("published") : t("draft")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                            href={`/admin/destination/${destination.id}`}
                                            className="text-green-900 hover:text-green-700 mr-4"
                                        >
                                            {t("updateButton")}
                                        </a>
                                        <button
                                            onClick={() => deleteTravel(destination.id)}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={deletingId === destination.id}
                                        >
                                            {deletingId === destination.id ? t("deleteInProgress") : t("deleteButton")}
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

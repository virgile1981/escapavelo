'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams, useRouter } from 'next/navigation'
import { Destination } from '@/types/trip'
import DestinationForm from '@/components/destination/DestinationForm'
import { destinationService } from '@/services/destinationService'

export default function EditTripPage() {
    const params = useParams()
    if (Array.isArray(params.slug)) {
        notFound();
    }

    const router = useRouter()
    const id = params?.slug as string
    const [destination, setDestination] = useState<Destination>()

    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadTravel = async () => {
            try {
                setLoading(true)
                const data = await destinationService.getTrip(id)
                setDestination(data)
            } catch (err) {
                console.error('Erreur lors du chargement du voyage :', err)
                setLoadError('Erreur lors du chargement du voyage')
            } finally {
                setLoading(false)
            }
        }
        if (id) loadTravel()
    }, [id])

    const handleSubmit = async (destination: Destination) => {
        try {
            setIsSaving(true)
            setError('')

            // Nettoyer les listes vides
            destination.included = destination.included.filter(i => i.trim() !== '')
            destination.notIncluded = destination.notIncluded.filter(i => i.trim() !== '')

            await destinationService.updateTrip(id, destination)
            router.push('/admin/destination')
        } catch (err) {
            console.error('Erreur lors de la sauvegarde :', err)
            setError('Une erreur est survenue lors de la sauvegarde')
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        router.push('/admin')
    }

    return (
        <div className="pt-24">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Modifier le voyage</h1>
                    <a
                        href="/admin"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Retour
                    </a>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Chargement du voyage...</p>
                    </div>
                )}

                {!loading && loadError && (
                    <div className="text-center py-12">
                        <p className="text-red-600">{loadError}</p>
                        <a
                            href="/admin"
                            className="mt-4 inline-block bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                        >
                            Retour à l&apos;administration
                        </a>
                    </div>
                )}

                {!loading && destination && !loadError && (
                    <DestinationForm
                        destination={destination}
                        isSaving={isSaving}
                        error={error}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

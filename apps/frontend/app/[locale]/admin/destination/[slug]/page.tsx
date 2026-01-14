'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams, useRouter } from 'next/navigation'
import DestinationForm from '@/components/destination/DestinationForm'
import { destinationService } from '@/services/destinationService'
import Link from 'next/link'
import { DestinationDTO, DestinationTranslation, type Locale } from '@escapavelo/shared-types'

export default function EditTripPage() {
    const params = useParams()
    if (Array.isArray(params.slug)) {
        notFound();
    }
    if (Array.isArray(params.locale)) {
        notFound();
    }

    const router = useRouter()
    const id = params.slug as string
    const locale = params.locale as Locale;
    const [destination, setDestination] = useState<DestinationDTO>()

    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadTravel = async () => {
            try {
                setLoading(true)
                const data = await destinationService.getDestination(id)
                // If any translation is available for the current destination we create it
                if (!data.translations.some(translation => translation.locale === locale)) {
                    data.translations.push(new DestinationTranslation(locale))
                }
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

    const handleSubmit = async (destination: DestinationDTO) => {
        try {
            setIsSaving(true)
            setError('')

            // Nettoyer les listes vides
            destination.translations.forEach(translation => {
                translation.included = translation.included ? translation.included.filter(i => i.trim() !== '') : []
                translation.notIncluded = translation.notIncluded ? translation.notIncluded.filter(i => i.trim() !== '') : []
            })

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
                    <Link
                        href="/admin"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Retour
                    </Link>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Chargement du voyage...</p>
                    </div>
                )}

                {!loading && loadError && (
                    <div className="text-center py-12">
                        <p className="text-red-600">{loadError}</p>
                        <Link
                            href="/admin"
                            className="mt-4 inline-block bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                        >
                            Retour à l&apos;administration
                        </Link>
                    </div>
                )}

                {!loading && destination && !loadError && (
                    <DestinationForm
                        locale={locale}
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

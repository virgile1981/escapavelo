'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import JustifiedGallery from '@/components/shared/JustifiedGallery'
import DifficultyIndicator from '@/components/shared/DifficultyIndicator'
import { CreatedDestination, Destination, TripDay } from '@/types/trip'
import { destinationService } from '@/services/destinationService'
import { MultiFormatImageUrl } from '@/types/common'
import Link from 'next/link'
import Image from 'next/image'

const DestinationPage = () => {
  const params = useParams()
  const slug = params?.slug

  const [destination, setDestination] = useState<Destination>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<MultiFormatImageUrl | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const travels = await destinationService.getAllTrips()
        const foundDestination = travels.find(
          (t: CreatedDestination) => t.slug === slug && t.status === 'published'
        )
        if (!foundDestination) {
          setError('Destination non trouvée')
        } else {
          setDestination(foundDestination)
        }
      } catch (err) {
        console.error(err)
        setError("Erreur lors du chargement de la destination")
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchDestination()
  }, [slug])

  //   const openImageModal = (image: MultiFormatImageUrl) => setSelectedImage(image)
  const closeImageModal = () => setSelectedImage(null)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Chargement de la destination...</p>
      </div>
    )
  }

  if (error || !destination) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La destination que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/destination"
          className="inline-flex items-center bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800"
        >
          Retour aux destinations
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {destination.imageUrl && <Image
          src={`${baseUrl}/uploads/${destination.imageUrl.url}`}
          height={150} width={300}
          alt={destination.title}
          className="object-cover"
        />}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{destination.title}</h1>
            <p className="text-xl">{destination.region}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2 lg:order-1 order-2">
            {/* Galerie d'images */}
            {destination.imageUrls?.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Galerie photos</h2>
                <JustifiedGallery images={destination.imageUrls} baseUrl={baseUrl} />
              </section>
            )}

            {/* Description */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Description</h2>
              <div
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: destination.longDescription }}
              />
            </section>

            {/* Itinéraire */}
            {destination.program?.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Itinéraire détaillé</h2>
                <div className="space-y-6">
                  {destination.program.map((day: TripDay) => (
                    <div key={day.day} className="bg-white border rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          Jour {day.day} - {day.title}
                        </h3>
                        {day.distance && (
                          <span className="text-green-900 font-medium">{day.distance} km</span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{day.description}</p>
                      {day.accommodation && (
                        <div className="text-sm text-gray-600">
                          <strong>Hébergement :</strong> {day.accommodation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclus / Non inclus */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Ce qui est inclus</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {destination.included?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-900">✓ Inclus</h3>
                    <ul className="space-y-2">
                      {destination.included.map((item: string) => (
                        <li key={item} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {destination.notIncluded?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-red-900">✗ Non inclus</h3>
                    <ul className="space-y-2">
                      {destination.notIncluded.map((item: string) => (
                        <li key={item} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                À partir de{' '}
                <span className="text-4xl font-bold text-green-900 mb-2">{destination.price}€</span>
                <p className="text-gray-600">par personne</p>
              </div>

              {/* Informations clés */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Durée</span>
                  <span className="font-medium">
                    {destination.duration} jours / {destination.duration - 1} nuits
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">{destination.distance} kms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulté</span>
                  <DifficultyIndicator level={destination.difficulty} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Région</span>
                  <span className="font-medium">{destination.region}</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <button
                  onClick={openPopup}
                  className="w-full border border-green-900 text-green-900 py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-medium"
                >
                  Demander des informations
                </button>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 text-center mb-3">
                  Une question ? Contactez-nous
                </p>
                <div className="text-center">
                  <Link
                    href="tel:+33782232016"
                    className="text-green-900 font-medium hover:underline"
                  >
                    +33 7 82 23 20 16
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t">
          <Link href="/destination" className="inline-flex items-center text-green-900 hover:text-green-700">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Retour aux destinations
          </Link>
        </div>
      </div>

      {/* Modal images */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div className="max-w-4xl max-h-full p-4">
            <Image
              src={`${baseUrl}/uploads/${selectedImage.resizedUrl}`}
              alt=""
              width={200}
              height={100}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Modal contact */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg relative max-w-lg w-full">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              aria-label="Fermer"
            >
              &times;
            </button>
            <ContactForm
              background="bg-green-900 bg-[url('/assets/heightmap.png')]"
              textColor="text-white"
              onSubmit={closePopup}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DestinationPage

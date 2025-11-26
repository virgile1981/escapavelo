import Link from 'next/link'
import Image from 'next/image'
import JustifiedGallery from '@/components/shared/JustifiedGallery'
import DifficultyIndicator from '@/components/shared/DifficultyIndicator'
import { type TripDay } from '@/types/destination'
import ContactPopup from '@/components/contact/ContactPopup'
import { ChevronLeft } from 'lucide-react'
import { destinationService } from '@/services/destinationService'
import { notFound } from 'next/navigation'

const uploadedImagesUrl = process.env.NEXT_PUBLIC_UPLOADED_BLOG_IMAGES_URL || '';

interface DestinationPageSSGProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: DestinationPageSSGProps) {
  const { slug } = params;
  const destination = await destinationService.getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: 'Destination non trouvé',
      description: 'Cette destination n’existe pas.',
    };
  }

  return {
    title: destination.title,
    description: destination.description,
    image: destination.imageUrl ? `${uploadedImagesUrl}/${destination.imageUrl?.resizedUrl}` : undefined,
    openGraph: {
      title: destination.title,
      description: destination.description,
      images: destination.imageUrl ? [`${uploadedImagesUrl}/${destination.imageUrl?.resizedUrl}`] : [],
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const destinations = await destinationService.getAllTrips('published');

  return destinations.map(v => ({ slug: v.slug }));
}

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (Array.isArray(params.slug)) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const destination = await destinationService.getDestinationBySlug(slug);

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
              <ContactPopup ></ContactPopup>

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
    </div>
  )
}


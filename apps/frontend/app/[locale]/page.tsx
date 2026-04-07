import AboutSection from "../../components/homepage/AboutSection";
import BlogPreview from "../../components/homepage/BlogPreview";
import ContactSection from "../../components/homepage/ContactSection";
import FeaturesSection from "../../components/homepage/FeaturesSection";
import PopularTrips from "../../components/homepage/PopularTrips";
import SearchTripSection from "../../components/homepage/SearchTripSection";
import { destinationService } from "@/services/destinationService";
import { getTranslations } from "next-intl/server";
import type { FlattenDestination, Locale } from "@escapavelo/shared-types";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.homepage');
  return {
    metadataBase: new URL('https://escapavelo.fr'),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://escapavelo.fr',
      languages: {
        'fr-FR': 'https://escapavelo.fr/fr',
        'en-US': 'https://escapavelo.fr/en'
      }
    },
    openGraph: {
      title: 'escapavelo',
      description: 'travel by bicycle',
      url: 'https://escapavelo.fr',
      siteName: 'escapavelo',
      images: [{ url: 'https://example.com/og.png' }]
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const destinations = await destinationService.getAllTrips(locale, 'published');
  const regions = destinations.map((t: FlattenDestination) => t.region);
  const t = await getTranslations('HomePage');

  return (
    <div className="flex flex-col items-center">
      <SearchTripSection regionsList={regions} />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 border-dirt-brown -mb-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <FeaturesSection background="bg-green-900 bg-[url('/assets/heightmap.webp')]" textColor="text-white" />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 -scale-y-[1] border-dirt-brown -mt-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <BlogPreview background="bg-sable" textColor="text-green-900" />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 border-dirt-brown -mb-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <PopularTrips background="bg-green-900 bg-[url('/assets/heightmap.webp')]" textColor="text-white" destinations={destinations} />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 -scale-y-[1] border-dirt-brown -mt-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <AboutSection background="bg-sable" textColor="text-gray-900"></AboutSection>
      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 border-dirt-brown -mb-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <ContactSection background="bg-green-900 bg-[url('/assets/heightmap.webp')]" textColor="text-white"></ContactSection>
    </div>
  );
}

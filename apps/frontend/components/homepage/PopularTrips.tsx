import DestinationCard from '../destination/DestinationCard';
import Link from 'next/link';
import type { StyleProps } from '@/types/common';
import type { FlattenDestination } from '@escapavelo/shared-types';

interface PopularTripsProps extends StyleProps {
  destinations?: FlattenDestination[];
}

export default function PopularTrips({ background = 'bg-sable', textColor = 'text-green-900', destinations }: PopularTripsProps) {

  const promotedDestinations = destinations?.filter(dest => dest.promoted) || [];

  return (
    <div className={`${background} w-full relative py-20 bg-center pt-12 xs:pt-16 sm:pt-20 md:pt-24 pb-12 xs:pb-16 sm:pb-20 md:pb-24 scroll-my-28 z-10`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`${textColor} text-3xl font-bold mb-12 text-center`}>
          Nos séjours les plus populaires
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {promotedDestinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination}></DestinationCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/destination"
            className="inline-flex items-center bg-sable text-black px-6 py-3 text-lg font-medium hover:bg-white/90 transition-colors"
          >
            Découvrez nos séjours à vélo
          </Link>
        </div>
      </div>
    </div>
  );
}
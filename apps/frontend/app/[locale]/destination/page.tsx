
import { DestinationResults } from '@/components/destination/DestinationResults'
import { destinationService } from '@/services/destinationService';
import { Suspense } from 'react';
import { Destination } from '@/types/destination';
import type { Locale } from '@escapavelo/shared-types';

export default async function DestinationsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const destinations = await destinationService.getAllTrips(locale, 'published');
  const regions = destinations.map((t: Destination) => t.region)
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DestinationResults regions={regions} destinations={destinations} />
    </Suspense>
  )
}

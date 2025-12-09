
import { DestinationResults } from '@/components/destination/DestinationResults'
import { destinationService } from '@/services/destinationService';
import { Suspense } from 'react';
import type { FlattenDestination, Locale } from '@escapavelo/shared-types';

export default async function DestinationsPage(params: Promise<{ params: { locale: Locale } }>) {
  const { locale } = (await params).params;
  const destinations = await destinationService.getAllTrips(locale, 'published');
  const regions = destinations.map((t: FlattenDestination) => t.region)
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DestinationResults regions={regions} destinations={destinations} />
    </Suspense>
  )
}

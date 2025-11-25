
import { DestinationResults } from '@/components/destination/DestinationResults'
import { destinationService } from '@/services/destinationService';
import { Suspense } from 'react';
import { Destination } from '@/types/destination';

export default async function DestinationsPage() {
  const destinations = await destinationService.getAllTrips('published');
  const regions = destinations.map((t: Destination) => t.region)
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DestinationResults regions={regions} destinations={destinations} />
    </Suspense>
  )
}

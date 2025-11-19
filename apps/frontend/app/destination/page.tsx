
import { fetchRegions } from '@/utils/data'
import { DestinationResults } from '@/components/destination/DestinationResults'

export default async function DestinationsPage() {
  const regions = await fetchRegions();
  return (
    <DestinationResults regions={regions} />
  )
}

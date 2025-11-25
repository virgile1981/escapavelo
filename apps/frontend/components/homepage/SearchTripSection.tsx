'use client'
import { type SearchFilters } from '@/types/destination';
import { generateSearchParametersUrl } from '@/utils/urlBuilder';
import DestinationSearchForm from '../destination/DestinationSearchForm';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  regionsList: string[];
}
export default function SearchForm({
  regionsList,
}: SearchFormProps) {

  const router = useRouter();
  const handleSearch = (searchFilters: SearchFilters) => {
    const queryString = generateSearchParametersUrl(searchFilters)
    let targetUrl = '/destination';
    if (queryString) {
      targetUrl += `?${queryString}`
    }
    router.push(targetUrl);
  };

  return (
    <div className="w-[90%] m-9 inline-flex justify-center">
      <DestinationSearchForm regionsList={regionsList} shownFilters={["region", "duration", "difficulty"]} onSubmit={handleSearch}></DestinationSearchForm>
    </div>
  )
}

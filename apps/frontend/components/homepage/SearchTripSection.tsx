'use client'
import { SearchFilters } from '@/types/destination';
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
    <DestinationSearchForm regionsList={regionsList} onSubmit={handleSearch}></DestinationSearchForm>
  )
}

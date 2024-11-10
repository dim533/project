import { useState, useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  
  const debouncedQuery = useDebounce(query, 300);
  const debouncedLocation = useDebounce(location, 300);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      q: query,
      location: location,
    });
  }, [query, location, setSearchParams]);

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
      <SearchInput
        icon={<Search className="w-5 h-5" />}
        value={query}
        onChange={setQuery}
        placeholder="Search gyms, trainers, or classes"
      />
      
      <SearchInput
        icon={<MapPin className="w-5 h-5" />}
        value={location}
        onChange={setLocation}
        placeholder="Location"
      />

      <Button type="submit" className="w-full sm:w-auto">
        Search
      </Button>
    </form>
  );
} 
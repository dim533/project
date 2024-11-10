import { useState, useCallback, useRef, useEffect } from 'react';
import { LocationSuggestion } from '../types';
import { getLocationSuggestions } from '../services/locationService';
import { useDebounce } from './useDebounce';

export function useLocationSearch() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const debouncedInput = useDebounce(input, 300);

  const fetchSuggestions = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);
      
      const results = await getLocationSuggestions(
        searchTerm, 
        abortControllerRef.current.signal
      );
      
      setSuggestions(results);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      setError('Failed to fetch locations');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions(debouncedInput);
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedInput, fetchSuggestions]);

  return {
    input,
    setInput,
    suggestions,
    isLoading,
    error,
  };
} 
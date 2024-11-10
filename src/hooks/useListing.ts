import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface Listing {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  image: string;
  images?: string[];
  phone?: string;
  email?: string;
  website?: string;
  amenities?: string[];
  schedule?: Array<{ day: string; hours: string }>;
  latitude?: number;
  longitude?: number;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export function useListing(id?: string) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!id) throw new Error('Listing ID is required');
        
        const { data, error: supabaseError } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        if (!data) throw new Error('Listing not found');
        
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError(err instanceof Error ? err.message : 'Failed to load listing');
        toast.error('Failed to load listing');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  return { listing, isLoading, error };
} 
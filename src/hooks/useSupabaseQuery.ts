import { useQuery } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '../lib/supabase';

export function useSupabaseQuery<T>(
  key: string[],
  queryFn: () => Promise<T>,
  options = {}
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        return await queryFn();
      } catch (error) {
        throw handleSupabaseError(error);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    ...options
  });
} 
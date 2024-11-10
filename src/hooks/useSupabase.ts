import { useCallback } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabase';
import type { Database } from '../types/supabase';

export function useSupabase() {
  const query = useCallback(async <T>(
    table: keyof Database['public']['Tables'],
    queryFn: (query: ReturnType<typeof supabase.from>) => Promise<{ data: T | null; error: any }>
  ) => {
    try {
      const { data, error } = await queryFn(supabase.from(table));
      if (error) throw error;
      return data;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  }, []);

  return { query, supabase };
} 
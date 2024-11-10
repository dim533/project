import { QueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const api = {
  businesses: {
    list: async ({ page = 1, limit = 10, filters = {} } = {}) => {
      let query = supabase
        .from('businesses')
        .select('*', { count: 'exact' });

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) query = query.eq(key, value);
      });

      const { data, error, count } = await query
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        items: data,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
      };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: Partial<Business>) => {
      const { error } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
  },
}; 
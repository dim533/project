import { createClient } from '@supabase/supabase-js';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface CacheStore {
  profiles: Record<string, any>;
  setProfile: (userId: string, data: any) => void;
  clearCache: () => void;
}

export const useCache = create(
  persist<CacheStore>(
    (set) => ({
      profiles: {},
      setProfile: (userId, data) =>
        set((state) => ({
          profiles: { ...state.profiles, [userId]: data }
        })),
      clearCache: () => set({ profiles: {} })
    }),
    {
      name: 'business-cache'
    }
  )
); 
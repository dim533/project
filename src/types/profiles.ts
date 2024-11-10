// src/types/profiles.ts
// src/types/profiles.ts
import { AccountType } from './auth';

// Rest of your profiles.ts remains the same
export type AccountType = 'gym' | 'trainer';

export interface SocialLinks {
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export interface Profile {
  id: string;
  user_id: string;
  type: AccountType;
  name: string;
  description?: string;
  avatar_url?: string;
  gallery: string[];
  location?: string;
  social_links: SocialLinks;
  specialties: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateProfileInput extends Omit<Profile, 'id' | 'created_at' | 'updated_at'> {}

export interface UpdateProfileInput extends Partial<Omit<Profile, 'id' | 'user_id' | 'created_at' | 'updated_at'>> {}
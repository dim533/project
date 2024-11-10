export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string
          name: string
          description: string
          image: string
          location: string
          category: string
          amenities: string[]
          created_at: string
          schedule?: Json
          social_media?: Json
        }
        Insert: Omit<Tables['listings']['Row'], 'id' | 'created_at'>
        Update: Partial<Tables['listings']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          listing_id: string
          author: string
          rating: number
          content: string
          date: string
          avatar?: string
        }
        Insert: Omit<Tables['reviews']['Row'], 'id' | 'date'>
        Update: Partial<Tables['reviews']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type BusinessProfile = {
  id: string;
  user_id: string;
  business_name: string;
  description: string;
  category: 'gym' | 'yoga' | 'crossfit' | 'martial-arts' | 'personal-training';
  contact_email: string;
  contact_phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  status: 'pending_verification' | 'active' | 'suspended';
  subscription_tier: 'basic' | 'pro';
  created_at: string;
  updated_at: string;
} 
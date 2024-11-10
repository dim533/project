export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      business_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          contact_email: string
          contact_phone: string
          website: string | null
          business_type: 'personal-trainer' | 'studio' | 'gym'
          subscription_plan: 'free' | 'pro' | 'enterprise'
          subscription_status: 'trial' | 'active' | 'past_due' | 'canceled'
          profile_data: Json
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Tables['business_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Tables['business_profiles']['Insert']>
      }
      business_locations: {
        Row: {
          id: string
          business_id: string
          address: string
          city: string
          state: string
          postal_code: string
          amenities: string[]
          operating_hours: Json
          created_at: string
        }
        Insert: Omit<Tables['business_locations']['Row'], 'id' | 'created_at'>
        Update: Partial<Tables['business_locations']['Insert']>
      }
      business_memberships: {
        Row: {
          id: string
          business_id: string
          name: string
          price: number
          benefits: string[]
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Tables['business_memberships']['Row'], 'id' | 'created_at'>
        Update: Partial<Tables['business_memberships']['Insert']>
      }
    }
  }
} 
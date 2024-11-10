import { z } from 'zod';

export type BusinessType = 'gym' | 'studio' | 'personal-trainer';

export interface BusinessFormData {
  business_name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  website?: string;
  termsAccepted: boolean;
  // Add other form fields...
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface MembershipPlan {
  name: string;
  price: number;
  benefits: string[];
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface BusinessLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

export interface BusinessContact {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
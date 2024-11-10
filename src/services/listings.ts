import { supabase } from '../lib/supabase';

export interface Listing {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  category: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  hours: {
    [key: string]: { open: string; close: string; } | 'Closed';
  };
  pricing?: {
    monthly?: number;
    dropIn?: number;
    pt?: number;
  };
}

export async function fetchListing(id: string): Promise<Listing> {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      id,
      name,
      description,
      image,
      images,
      category,
      amenities,
      rating,
      review_count,
      location,
      contact,
      hours,
      pricing
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching listing:', error);
    throw new Error('Failed to fetch listing');
  }

  if (!data) {
    throw new Error('Listing not found');
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    image: data.image,
    images: data.images || [],
    category: data.category,
    amenities: data.amenities || [],
    rating: data.rating || 0,
    reviewCount: data.review_count || 0,
    location: {
      address: data.location?.address || '',
      city: data.location?.city || '',
      latitude: data.location?.latitude || 0,
      longitude: data.location?.longitude || 0
    },
    contact: data.contact || {},
    hours: data.hours || {},
    pricing: data.pricing || {}
  };
}

export async function fetchFeaturedListings(limit: number = 6): Promise<Listing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      id,
      name,
      description,
      image,
      images,
      category,
      amenities,
      rating,
      review_count,
      location,
      contact,
      hours,
      pricing
    `)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured listings:', error);
    throw new Error('Failed to fetch featured listings');
  }

  return (data || []).map(listing => ({
    id: listing.id,
    name: listing.name,
    description: listing.description,
    image: listing.image,
    images: listing.images || [],
    category: listing.category,
    amenities: listing.amenities || [],
    rating: listing.rating || 0,
    reviewCount: listing.review_count || 0,
    location: {
      address: listing.location?.address || '',
      city: listing.location?.city || '',
      latitude: listing.location?.latitude || 0,
      longitude: listing.location?.longitude || 0
    },
    contact: listing.contact || {},
    hours: listing.hours || {},
    pricing: listing.pricing || {}
  }));
} 
import { supabase } from '../lib/supabase';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  avatar?: string;
  listingId: string;
}

export async function fetchReviews(listingId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('listingId', listingId)
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return []; // Return empty array instead of throwing
  }
} 
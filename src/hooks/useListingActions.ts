import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export function useListingActions(listingId?: string) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Toggle favorite status
  const toggleFavorite = useCallback(async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast.error('Please login to save favorites');
        return;
      }

      setIsFavorite(prev => !prev);
      
      const { error } = await supabase
        .from('favorites')
        .upsert({
          user_id: user.data.user.id,
          listing_id: listingId,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsFavorite(prev => !prev); // Revert on error
      toast.error('Failed to update favorites');
    }
  }, [listingId, isFavorite]);

  // Share listing
  const shareListing = useCallback(async (title: string, description: string) => {
    try {
      setIsSharing(true);
      
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share listing');
    } finally {
      setIsSharing(false);
    }
  }, []);

  return {
    isFavorite,
    isSharing,
    toggleFavorite,
    shareListing,
  };
} 
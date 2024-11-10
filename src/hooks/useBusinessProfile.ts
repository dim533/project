import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { businessService } from '../services/businessService';
import type { BusinessProfile } from '../types/business';

export function useBusinessProfile(userId: string) {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['businessProfile', userId],
    queryFn: () => businessService.getBusinessProfile(userId),
    enabled: !!userId
  });

  const updateProfile = useMutation({
    mutationFn: (updates: Partial<BusinessProfile>) => 
      businessService.updateBusinessProfile(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['businessProfile', userId]);
    }
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile
  };
} 
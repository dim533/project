import { useState } from 'react';
import { businessService } from '../services/businessService';
import { toast } from 'react-hot-toast';

export function useBusinessRegistration() {
  const [loading, setLoading] = useState(false);

  const registerBusiness = async (data: any) => {
    try {
      setLoading(true);
      const result = await businessService.registerBusiness(data);
      toast.success('Registration successful! Please verify your email.');
      return { error: null, ...result };
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register business');
      return { error, user: null };
    } finally {
      setLoading(false);
    }
  };

  return { registerBusiness, loading };
} 
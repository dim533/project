import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function useSubscription(userId: string) {
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const createCheckoutSession = useMutation({
    mutationFn: async (priceId: string) => {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId, userId }
      });

      if (error) throw error;

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (result.error) throw result.error;
    }
  });

  return {
    subscription,
    isLoading,
    createCheckoutSession
  };
} 
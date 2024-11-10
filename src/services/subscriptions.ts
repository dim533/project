import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    interval: 'month',
    features: [
      'Basic business profile',
      'Photo gallery (up to 5 photos)',
      'Business hours listing',
      'Contact information',
      'Basic analytics'
    ],
    stripePriceId: 'price_basic_monthly'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    interval: 'month',
    features: [
      'Everything in Basic',
      'Unlimited photos',
      'Class schedule management',
      'Customer messaging',
      'Advanced analytics',
      'Priority support'
    ],
    stripePriceId: 'price_pro_monthly'
  }
];

export async function createSubscription(priceId: string) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error('Not authenticated');

    // Create Stripe Checkout Session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId, userId: session.user.id }
    });

    if (error) throw error;

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });

    if (result.error) throw result.error;

  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
}

export async function getSubscriptionStatus() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
} 
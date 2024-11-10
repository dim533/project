import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useBusinessRegistration } from '../../hooks/useBusinessRegistration';
import { supabase } from '../../lib/supabase';

const businessSchema = z.object({
  business_name: z.string()
    .min(2, 'Business name must be at least 2 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters'),
  contact_email: z.string().email('Invalid email address'),
  contact_phone: z.string()
    .min(10, 'Phone number must be at least 10 digits'),
  website: z.string().optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' })
  })
});

export function BusinessRegistrationForm() {
  const navigate = useNavigate();
  const { registerBusiness, loading } = useBusinessRegistration();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      termsAccepted: false
    }
  });

  const onSubmit = async (data: z.infer<typeof businessSchema>) => {
    try {
      loading(true);
      
      // Create auth user with specific options
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.contact_email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            business_name: data.business_name
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('not authorized')) {
          toast.error('Please use a valid business email address');
          return;
        }
        throw signUpError;
      }

      // Create business profile
      const { error: profileError } = await supabase
        .from('business_profiles')
        .insert({
          user_id: authData.user?.id,
          business_name: data.business_name,
          description: data.description,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone,
          website: data.website || null,
          subscription_plan: 'basic',
          subscription_status: 'pending'
        });

      if (profileError) throw profileError;

      toast.success('Registration successful! Please verify your email.');
      navigate('/verification-pending');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Business Name"
          {...register('business_name')}
          error={errors.business_name?.message}
        />

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Description
          </label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
            rows={4}
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <Input
          label="Email"
          type="email"
          {...register('contact_email')}
          error={errors.contact_email?.message}
        />

        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          label="Phone"
          {...register('contact_phone')}
          error={errors.contact_phone?.message}
        />

        <Input
          label="Website (Optional)"
          {...register('website')}
          error={errors.website?.message}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('termsAccepted')}
            className="rounded border-white/10 bg-white/5"
          />
          <label className="text-sm text-white/70">
            I accept the terms and conditions
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-400 text-sm">{errors.termsAccepted.message}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registering...
            </>
          ) : (
            'Register Business'
          )}
        </Button>
      </form>
    </Card>
  );
} 
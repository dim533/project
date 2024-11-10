import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ImageUploader } from './ImageUploader';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const profileSchema = z.object({
  business_name: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be less than 100 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string()
      .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number')
      .optional(),
    website: z.string().url('Invalid URL').optional()
  }),
  hours: z.record(z.object({
    open: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    close: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    closed: z.boolean()
  }))
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileManager() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  });

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        reset(data);
        setProfileImage(data.profile_image || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('business_profiles')
        .upsert({
          user_id: user.id,
          ...data,
          profile_image: profileImage,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Business Profile</h2>
          <p className="text-white/60">
            Manage your business information and settings
          </p>
        </div>

        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="hours">Business Hours</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic" className="space-y-4">
              <div>
                <ImageUploader
                  images={profileImage ? [profileImage] : []}
                  onImagesChange={(urls) => setProfileImage(urls[0])}
                  maxImages={1}
                />
                <p className="text-sm text-white/40 mt-2">
                  Recommended: Square image, at least 500x500px
                </p>
              </div>

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
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Additional tabs content... */}
          </div>

          <Button
            type="submit"
            className="mt-6"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </Card>
  );
} 
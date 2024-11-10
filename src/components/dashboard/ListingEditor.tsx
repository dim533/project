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

const listingSchema = z.object({
  name: z.string().min(2, 'Business name is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
  amenities: z.array(z.string()),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
  }),
  hours: z.record(z.object({
    open: z.string(),
    close: z.string(),
  })),
  pricing: z.object({
    monthly: z.number().optional(),
    dropIn: z.number().optional(),
    pt: z.number().optional(),
  }),
});

type ListingFormData = z.infer<typeof listingSchema>;

export function ListingEditor() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema)
  });

  useEffect(() => {
    // Load existing listing data
    const loadListing = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading listing:', error);
        return;
      }

      if (data) {
        reset(data);
        setImages(data.images || []);
      }
    };

    loadListing();
  }, [user, reset]);

  const onSubmit = async (data: ListingFormData) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('listings')
        .upsert({
          ...data,
          images,
          user_id: user?.id,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Listing updated successfully!');
    } catch (error) {
      console.error('Error updating listing:', error);
      toast.error('Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <TabsContent value="basic">
            {/* Basic Info Fields */}
          </TabsContent>

          <TabsContent value="photos">
            <ImageUploader 
              images={images} 
              onImagesChange={setImages} 
              maxImages={10} 
            />
          </TabsContent>

          <TabsContent value="location">
            {/* Location Fields */}
          </TabsContent>

          <TabsContent value="hours">
            {/* Hours Fields */}
          </TabsContent>

          <TabsContent value="pricing">
            {/* Pricing Fields */}
          </TabsContent>

          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Tabs>
    </Card>
  );
} 
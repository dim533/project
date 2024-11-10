import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type BusinessProfile = Database['public']['Tables']['business_profiles']['Row'];
type BusinessLocation = Database['public']['Tables']['business_locations']['Row'];
type BusinessMembership = Database['public']['Tables']['business_memberships']['Row'];

interface RegisterBusinessData {
  email: string;
  password: string;
  business_name: string;
  contact_phone: string;
  website?: string;
  businessType: BusinessProfile['business_type'];
  locations?: Omit<BusinessLocation, 'id' | 'business_id' | 'created_at'>[];
  memberships?: Omit<BusinessMembership, 'id' | 'business_id' | 'created_at'>[];
  profile_data: any;
}

export const businessService = {
  async registerBusiness(data: RegisterBusinessData) {
    try {
      // 1. Create auth user
      const { user, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });
      
      if (authError) throw authError;

      // 2. Create business profile
      const { data: profile, error: profileError } = await supabase
        .from('business_profiles')
        .insert({
          user_id: user.id,
          business_name: data.business_name,
          contact_email: data.email,
          contact_phone: data.contact_phone,
          website: data.website,
          business_type: data.businessType,
          profile_data: data.profile_data
        });

      if (profileError) throw profileError;

      // 3. Create locations if provided
      if (data.locations?.length) {
        const { error: locationsError } = await supabase
          .from('business_locations')
          .insert(
            data.locations.map(location => ({
              ...location,
              business_id: profile.id
            }))
          );

        if (locationsError) throw locationsError;
      }

      // 4. Create memberships if provided
      if (data.memberships?.length) {
        const { error: membershipsError } = await supabase
          .from('business_memberships')
          .insert(
            data.memberships.map(membership => ({
              ...membership,
              business_id: profile.id
            }))
          );

        if (membershipsError) throw membershipsError;
      }

      return { profile, user };
    } catch (error) {
      console.error('Business registration error:', error);
      throw error;
    }
  },

  async getBusinessProfile(userId: string) {
    const { data, error } = await supabase
      .from('business_profiles')
      .select(`
        *,
        locations:business_locations(*),
        memberships:business_memberships(*)
      `)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateBusinessProfile(
    businessId: string,
    updates: Partial<BusinessProfile>
  ) {
    const { error } = await supabase
      .from('business_profiles')
      .update(updates)
      .eq('id', businessId);

    if (error) throw error;
  },

  async updateLocations(
    businessId: string,
    locations: Omit<BusinessLocation, 'id' | 'created_at'>[]
  ) {
    // First delete existing locations
    await supabase
      .from('business_locations')
      .delete()
      .eq('business_id', businessId);

    // Then insert new ones
    const { error } = await supabase
      .from('business_locations')
      .insert(locations.map(location => ({
        ...location,
        business_id: businessId
      })));

    if (error) throw error;
  },

  async updateMemberships(
    businessId: string,
    memberships: Omit<BusinessMembership, 'id' | 'created_at'>[]
  ) {
    // First delete existing memberships
    await supabase
      .from('business_memberships')
      .delete()
      .eq('business_id', businessId);

    // Then insert new ones
    const { error } = await supabase
      .from('business_memberships')
      .insert(memberships.map(membership => ({
        ...membership,
        business_id: businessId
      })));

    if (error) throw error;
  }
}; 
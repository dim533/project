import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Profile } from '../../types/profile';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

export default function ProfileEditor() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<Profile>>({
    name: '',
    description: '',
    avatar_url: '',
    gallery: [],
    location: '',
    social_links: {},
    specialties: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'gallery') => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user?.id}/${type}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      if (type === 'avatar') {
        setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      } else {
        setProfile(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), publicUrl]
        }));
      }

      toast.success(`${type === 'avatar' ? 'Profile picture' : 'Gallery image'} uploaded successfully!`);
    } catch (error) {
      toast.error('Error uploading image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className="flex items-center space-x-4">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <label className="cursor-pointer bg-purple-50 hover:bg-purple-100 text-purple-600 px-4 py-2 rounded-md flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'avatar')}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={profile.description || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['website', 'instagram', 'facebook', 'twitter'].map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{platform}</label>
                <input
                  type="url"
                  value={profile.social_links?.[platform as keyof typeof profile.social_links] || ''}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    social_links: {
                      ...prev.social_links,
                      [platform]: e.target.value
                    }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.gallery?.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({
                    ...prev,
                    gallery: prev.gallery?.filter((_, i) => i !== index)
                  }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-purple-500">
              <div className="text-center">
                <Upload className="mx-auto w-8 h-8 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-600">Add Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'gallery')}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
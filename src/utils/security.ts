import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

export function validateImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

export function validateFileSize(file: File, maxSizeMB: number): boolean {
  return file.size <= maxSizeMB * 1024 * 1024;
}

export async function sanitizeAndUploadImage(
  file: File,
  path: string,
  supabase: ReturnType<typeof createClient>
): Promise<string> {
  if (!validateImageType(file)) {
    throw new Error('Invalid image type. Please use JPG, PNG or WebP');
  }

  if (!validateFileSize(file, 5)) {
    throw new Error('File size too large. Maximum size is 5MB');
  }

  try {
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(path, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(path);

    return publicUrl;
  } catch (error) {
    toast.error('Failed to upload image');
    throw error;
  }
} 
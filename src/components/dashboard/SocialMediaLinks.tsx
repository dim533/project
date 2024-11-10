import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface SocialMediaLinksProps {
  register: any;
  errors: any;
}

export function SocialMediaLinks({ register, errors }: SocialMediaLinksProps) {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Facebook className="w-5 h-5 text-blue-500" />
          <span className="text-white">Facebook</span>
        </div>
        <Input
          placeholder="https://facebook.com/yourbusiness"
          {...register('socialMedia.facebook')}
          error={errors.socialMedia?.facebook?.message}
        />
      </Card>

      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Instagram className="w-5 h-5 text-pink-500" />
          <span className="text-white">Instagram</span>
        </div>
        <Input
          placeholder="https://instagram.com/yourbusiness"
          {...register('socialMedia.instagram')}
          error={errors.socialMedia?.instagram?.message}
        />
      </Card>

      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Twitter className="w-5 h-5 text-blue-400" />
          <span className="text-white">Twitter</span>
        </div>
        <Input
          placeholder="https://twitter.com/yourbusiness"
          {...register('socialMedia.twitter')}
          error={errors.socialMedia?.twitter?.message}
        />
      </Card>
    </div>
  );
} 
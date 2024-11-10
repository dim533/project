import { Phone, Mail, Globe, Calendar, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface ContactInfoProps {
  listing: {
    phone?: string;
    email?: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

export function ContactInfo({ listing }: ContactInfoProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
        <div className="space-y-3">
          {listing.phone && (
            <div className="flex items-center gap-3 text-white/70">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{listing.phone}</span>
            </div>
          )}
          {listing.email && (
            <div className="flex items-center gap-3 text-white/70">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{listing.email}</span>
            </div>
          )}
          {listing.website && (
            <div className="flex items-center gap-3 text-white/70">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{listing.website}</span>
            </div>
          )}
          
          {/* Social Media */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Twitter className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Book Tour
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
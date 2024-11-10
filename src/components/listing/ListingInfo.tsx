import { Clock, MapPin, Phone, Globe } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Listing } from '../../services/listings';

interface ListingInfoProps {
  listing: Listing;
}

export function ListingInfo({ listing }: ListingInfoProps) {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{listing.name}</h1>
          <div className="flex flex-wrap gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{listing.location.address}</span>
            </div>
            {listing.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{listing.contact.phone}</span>
              </div>
            )}
            {listing.contact.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a 
                  href={listing.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">About</h2>
          <p className="text-white/70 leading-relaxed">{listing.description}</p>
        </div>

        {listing.amenities.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(listing.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-white/70">
                <span className="font-medium">{day}</span>
                <span>
                  {typeof hours === 'string' 
                    ? hours 
                    : `${hours.open} - ${hours.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 
import React from 'react';
import { memo } from 'react';
import { Star, MapPin, Clock, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { BusinessListing } from '../../types/business';
import { formatCurrency } from '../../lib/utils';

interface BusinessCardProps {
  business: BusinessListing;
  onClick?: () => void;
}

function BusinessCardComponent({ business, onClick }: BusinessCardProps) {
  return (
    <Card variant="interactive" onClick={onClick} className="h-full">
      <CardHeader>
        <div className="relative">
          <img
            src={business.mainImage}
            alt={business.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {business.featured && (
            <Badge variant="featured" className="absolute top-2 right-2">
              Featured
            </Badge>
          )}
          {business.verified && (
            <Badge variant="verified" className="absolute top-2 left-2">
              <Check className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold truncate">{business.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{business.rating}</span>
            <span className="ml-1 text-sm text-gray-500">
              ({business.reviewCount})
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {business.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{business.location.city}, {business.location.state}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>Open Now</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {business.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="outline">
              {specialty}
            </Badge>
          ))}
          {business.specialties.length > 3 && (
            <Badge variant="outline">+{business.specialties.length - 3}</Badge>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Starting from</span>
            <span className="text-lg font-semibold text-purple-600">
              {formatCurrency(
                typeof business.pricing.value === 'number'
                  ? business.pricing.value
                  : business.pricing.value.min,
                business.pricing.currency
              )}
              {business.pricing.period && (
                <span className="text-sm text-gray-500">
                  /{business.pricing.period}
                </span>
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const BusinessCard = memo(BusinessCardComponent);
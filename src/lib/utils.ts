import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BusinessHours, BusinessListing } from '../types/business';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function isBusinessOpen(hours: BusinessHours[]): boolean {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const todayHours = hours.find(h => h.day === currentDay);
  if (!todayHours || todayHours.closed) return false;

  const [openHour, openMinute] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);

  const currentTime = currentHour * 60 + currentMinute;
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  return currentTime >= openTime && currentTime <= closeTime;
}

interface StructuredData {
  '@context': 'https://schema.org';
  '@type': string;
  name: string;
  image: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  url?: string;
  aggregateRating: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
}

export function generateStructuredData(business: BusinessListing): string {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': business.type === 'trainer' ? 'LocalBusiness' : 'HealthClub',
    name: business.name,
    image: business.mainImage,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.location.address,
      addressLocality: business.location.city,
      addressRegion: business.location.state,
      postalCode: business.location.zip,
    },
    ...(business.location.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.location.coordinates.lat,
        longitude: business.location.coordinates.lng,
      }
    }),
    telephone: business.contact.phone,
    email: business.contact.email,
    url: business.contact.website,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
    openingHoursSpecification: business.hours
      .filter(h => !h.closed)
      .map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
  };

  return JSON.stringify(schema, null, 2);
}

export function formatBusinessHours(hours: BusinessHours[]): string {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours = hours.find(h => h.day === today);

  if (!todayHours || todayHours.closed) return 'Closed';
  return `${todayHours.open} - ${todayHours.close}`;
}

export function getBusinessStatus(hours: BusinessHours[]): {
  isOpen: boolean;
  status: string;
  nextOpen?: string;
} {
  const isOpen = isBusinessOpen(hours);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours = hours.find(h => h.day === today);

  if (!todayHours || todayHours.closed) {
    const nextOpenDay = hours.find(h => !h.closed);
    return {
      isOpen: false,
      status: 'Closed',
      nextOpen: nextOpenDay ? `Opens ${nextOpenDay.day} at ${nextOpenDay.open}` : undefined
    };
  }

  return {
    isOpen,
    status: isOpen ? 'Open' : 'Closed',
    nextOpen: isOpen ? undefined : `Opens today at ${todayHours.open}`
  };
}
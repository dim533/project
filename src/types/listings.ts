export interface Location {
  city: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  mainImage: string;
  category: string;
  rating: number;
  amenities: string[];
  location: Location;
} 
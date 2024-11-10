export interface LocationSuggestion {
  id: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SearchFormData {
  query: string;
  location: LocationSuggestion | null;
}

export interface PopularSearch {
  id: string;
  label: string;
  category?: string;
} 
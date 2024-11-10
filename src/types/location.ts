export interface LocationSuggestion {
  id: string;
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

export interface SearchFormData {
  service: string;
  location: LocationSuggestion | null;
} 
import { LocationSuggestion } from '../types';

export async function getLocationSuggestions(
  input: string,
  signal?: AbortSignal
): Promise<LocationSuggestion[]> {
  if (!input.trim()) return [];

  try {
    // Mock data for now - replace with actual API call later
    return [
      {
        id: '1',
        placeId: 'ny123',
        mainText: 'New York',
        secondaryText: 'NY, USA',
        description: 'New York, NY, USA'
      },
      {
        id: '2',
        placeId: 'la123',
        mainText: 'Los Angeles',
        secondaryText: 'CA, USA',
        description: 'Los Angeles, CA, USA'
      }
    ];

    // Real API implementation would look like this:
    // const response = await fetch(`/api/locations/suggestions?query=${encodeURIComponent(input)}`, {
    //   signal
    // });
    // if (!response.ok) throw new Error('Failed to fetch locations');
    // const data = await response.json();
    // return data.map((item: any) => ({
    //   id: item.place_id,
    //   placeId: item.place_id,
    //   mainText: item.structured_formatting.main_text,
    //   secondaryText: item.structured_formatting.secondary_text,
    //   description: item.description
    // }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
} 
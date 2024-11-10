import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function Map({ latitude, longitude, zoom = 15 }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !GOOGLE_MAPS_API_KEY) return;

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly'
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      const position = { lat: latitude, lng: longitude };
      
      mapInstanceRef.current = new Map(mapRef.current, {
        center: position,
        zoom,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }]
          }
        ]
      });

      new AdvancedMarkerElement({
        map: mapInstanceRef.current,
        position,
      });
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
    });

    return () => {
      if (mapInstanceRef.current) {
        // Cleanup
      }
    };
  }, [latitude, longitude, zoom]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="p-4 bg-white/5">
        <p className="text-white/70">Map configuration is missing.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-[300px]" 
        style={{ borderRadius: 'inherit' }}
      />
    </Card>
  );
} 
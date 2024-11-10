import { Suspense } from 'react';
import { ListingHeader } from './ListingHeader';
import { ListingTabs } from './ListingTabs';
import { Map } from '../Map';
import { Reviews } from './Reviews';
import { Skeleton } from '../ui/skeleton';

interface ListingContentProps {
  listing: Listing;
  actions: {
    isFavorite: boolean;
    isSharing: boolean;
    onFavoriteToggle: () => void;
    onShare: () => void;
  };
}

export function ListingContent({ listing, actions }: ListingContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <ListingHeader 
        name={listing.name}
        category={listing.category}
        {...actions}
      />

      <Suspense fallback={<Skeleton className="h-[200px]" />}>
        <ListingTabs listing={listing} />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <Map 
          latitude={listing.latitude} 
          longitude={listing.longitude}
        />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <Reviews listingId={listing.id} />
      </Suspense>
    </div>
  );
} 
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchListing, type Listing } from '../services/listings';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { ListingGallery } from '../components/listing/ListingGallery';
import { ListingInfo } from '../components/listing/ListingInfo';
import { ListingSidebar } from '../components/listing/ListingSidebar';
import { Reviews } from '../components/listing/Reviews';
import { Spinner } from '../components/ui/spinner';
import { ErrorDisplay } from '../components/ui/error-display';

export default function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListing(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000 // Cache for 5 minutes
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !listing) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      <SEO 
        title={`${listing.name} | FitFinder`}
        description={listing.description}
        image={listing.image}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24">
        <div className="container mx-auto px-6 py-8">
          <ListingGallery images={listing.images || [listing.image]} />
          
          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ListingInfo listing={listing} />
              <Reviews listingId={listing.id} />
            </div>
            <ListingSidebar listing={listing} />
          </div>
        </div>
      </main>
    </>
  );
}

function LoadingState() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24">
        <div className="container mx-auto px-6 py-8 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    </>
  );
}

function ErrorState({ error }: { error: unknown }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24">
        <div className="container mx-auto px-6 py-8">
          <ErrorDisplay 
            title="Error Loading Listing"
            message={error instanceof Error ? error.message : 'Unable to load listing details'}
          />
        </div>
      </div>
    </>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedListings } from '../services/listings';
import { Skeleton } from '../components/ui/skeleton';
import type { Listing } from '../types/listings';
import { ListingGallery } from '../components/listing/ListingGallery';

const ITEMS_PER_PAGE = 6;

function SectionHeader() {
  return (
    <div className="text-center mb-16 relative z-10">
      <motion.span
        className="text-emerald-400 text-sm font-medium tracking-wider uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Featured Listings
      </motion.span>
      <motion.h2
        className="text-4xl font-bold text-white mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Discover Top-Rated Fitness Spaces
      </motion.h2>
    </div>
  );
}

function ListingsGrid({ listings, isLoading }: { listings?: Listing[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10">
            <CardHeader className="p-0">
              <Skeleton className="h-48 w-full bg-white/5" />
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-2/3 mb-4 bg-white/5" />
              <Skeleton className="h-4 w-1/2 bg-white/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings?.map((listing) => (
        <Link key={listing.id} to={`/listings/${listing.id}`}>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <ListingGallery images={listing.images || [listing.image]} />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-sm">
                    {listing.category}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {listing.name}
              </h3>
              <div className="flex flex-col gap-2 text-white/70">
                {listing.location.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location.city}</span>
                  </div>
                )}
                {listing.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {listing.amenities.slice(0, 3).map((amenity, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-white/10 px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {listing.amenities.length > 3 && (
                      <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                        +{listing.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function ViewAllButton() {
  return (
    <div className="text-center mt-12">
      <Link to="/listings">
        <Button variant="outline" size="lg">
          View All Listings
        </Button>
      </Link>
    </div>
  );
}

function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="p-6 bg-red-500/10 border-red-500/20">
        <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
        <p className="text-white/70 mb-4">{message}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Card>
    </div>
  );
}

export default function FeaturedListings() {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['featured-listings'],
    queryFn: () => fetchFeaturedListings(ITEMS_PER_PAGE),
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  if (error) {
    return <ErrorDisplay message="Failed to load featured listings" />;
  }

  return (
    <motion.section 
      className="py-32 relative bg-slate-950"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <DecorativeBackground />
      <div className="container mx-auto px-6">
        <SectionHeader />
        <ListingsGrid listings={listings} isLoading={isLoading} />
        <ViewAllButton />
      </div>
    </motion.section>
  );
}
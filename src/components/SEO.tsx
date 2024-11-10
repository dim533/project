import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({ 
  title = 'FitFinder - Find Your Perfect Fitness Space',
  description = 'Connect with top-rated gyms and fitness trainers in your area. Find and book the best fitness experiences near you.'
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
} 
// src/pages/HomePage.tsx
import React from 'react';
import { SEO } from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import FitnessCategories from '../components/home/FitnessCategories';
import FeaturedListings from '../components/FeaturedListings';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <SEO />
      <HeroBanner />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        <FitnessCategories />
        <FeaturedListings />
      </motion.div>
    </div>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

const HeroBanner = () => {
  return (
    <div className="relative min-h-[90vh] bg-slate-950">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2070"
          alt="Fitness Background"
          className="object-cover w-full h-full opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30 backdrop-blur-sm">
              <Dumbbell className="h-6 w-6 text-emerald-500" />
            </div>
            <span className="text-2xl font-bold text-white">FitFinder</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/deals" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Deals
            </Link>
            <Link to="/list-business" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              List Your Business
            </Link>
            <Button variant="default" size="sm">
              Sign in
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-white mb-6 leading-tight"
          >
            Find Your Perfect
            <span className="block bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">
              Fitness Space
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 mb-12"
          >
            Connect with top-rated gyms and fitness trainers in your area
          </motion.p>

          {/* Search Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20"
          >
            <form className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search gyms, trainers, or classes"
                  className="pl-12"
                />
              </div>
              
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="pl-12"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Search
              </Button>
            </form>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: '1,000+', label: 'Fitness Locations' },
              { value: '5,000+', label: 'Active Members' },
              { value: '500+', label: 'Expert Trainers' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
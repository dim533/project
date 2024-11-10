export const SITE_NAME = 'FitFinder';
export const SITE_DESCRIPTION = 'Find your perfect fitness space. Connect with top-rated gyms, studios, and fitness professionals in your area.';

export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'List Your Business', path: '/list-business' },
  { name: 'Find a Gym', path: '/gyms' },
  { name: 'Find a Trainer', path: '/trainers' },
] as const;

import { Flower, Activity, Sword, Dumbbell, Heart, Timer, Waves, Music } from 'lucide-react';

export const FITNESS_CATEGORIES = [
  { id: 'yoga', name: 'Yoga', icon: Flower },
  { id: 'pilates', name: 'Pilates', icon: Activity },
  { id: 'martial-arts', name: 'Martial Arts', icon: Sword },
  { id: 'strength', name: 'Strength', icon: Dumbbell },
  { id: 'cardio', name: 'Cardio', icon: Heart },
  { id: 'crossfit', name: 'CrossFit', icon: Timer },
  { id: 'swimming', name: 'Swimming', icon: Waves },
  { id: 'dance', name: 'Dance', icon: Music },
] as const;
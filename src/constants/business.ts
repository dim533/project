export const BUSINESS_STEPS = {
  'personal-trainer': ['contact', 'qualifications', 'services', 'pricing'],
  'studio': ['contact', 'facility', 'services', 'pricing'],
  'gym': ['contact', 'facilities', 'memberships', 'pricing']
} as const;

export const STEP_TITLES = {
  contact: 'Contact Information',
  qualifications: 'Professional Qualifications',
  services: 'Services Offered',
  pricing: 'Pricing Plans',
  facilities: 'Facility Details',
  facility: 'Facility Information',
  memberships: 'Membership Plans'
} as const; 
import { z } from 'zod';

export const contactSchema = z.object({
  business_name: z.string().min(2, 'Business name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  contact_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' })
  })
});

export const qualificationsSchema = z.object({
  certifications: z.string().min(1, 'Certifications are required'),
  experience: z.string().min(10, 'Please provide more detail about your experience'),
  specializations: z.string().min(1, 'Specializations are required')
});

// Add other schemas...

export const businessStepSchemas = {
  'personal-trainer': {
    contact: contactSchema,
    qualifications: qualificationsSchema,
    // ... other schemas
  },
  'studio': {
    // ... studio schemas
  },
  'gym': {
    // ... gym schemas
  }
} as const; 
import { z } from 'zod';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const commonContactSchema = z.object({
  business_name: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name cannot exceed 100 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .refine(email => email.includes('.'), 'Please enter a complete email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  phone: z.string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional(),
  website: z.string()
    .url('Please enter a valid URL')
    .optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' })
  })
});

export const businessStepSchemas = {
  'gym': {
    contact: commonContactSchema,
    facilities: z.object({
      locations: z.array(z.object({
        address: z.string().min(5, 'Please enter a valid address'),
        city: z.string().min(2, 'Please enter a valid city'),
        state: z.string().length(2, 'Please enter a valid state code'),
        postal_code: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid postal code'),
        amenities: z.array(z.string()).min(1, 'Please select at least one amenity')
      })).min(1, 'Please add at least one location')
    }),
    memberships: z.object({
      plans: z.array(z.object({
        name: z.string().min(2, 'Please enter a valid plan name'),
        price: z.number().min(0, 'Price must be 0 or greater'),
        benefits: z.array(z.string()).min(1, 'Please add at least one benefit')
      })).min(1, 'Please add at least one membership plan')
    })
  },
  // Add similar schemas for 'studio' and 'personal-trainer'
}; 
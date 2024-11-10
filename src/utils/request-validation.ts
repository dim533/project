import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Rate limiting configuration
export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  max: number = 100 // limit each IP to 100 requests per windowMs
) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Request validation middleware
export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      req.validated = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Invalid request data',
          details: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
};

// API Key validation
export const validateApiKey = async (
  supabase: ReturnType<typeof createClient>,
  apiKey: string
) => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', apiKey)
    .single();

  if (error || !data) {
    throw new Error('Invalid API key');
  }

  return data;
}; 
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export class InputSanitizer {
  static sanitizeHTML(input: string): string {
    return purify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href'],
    });
  }

  static sanitizeObject<T extends object>(obj: T): T {
    const sanitized = { ...obj };
    
    Object.entries(sanitized).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Remove any potential XSS vectors
        (sanitized as any)[key] = this.sanitizeString(value);
      } else if (value && typeof value === 'object') {
        (sanitized as any)[key] = this.sanitizeObject(value);
      }
    });

    return sanitized;
  }

  static sanitizeString(input: string): string {
    // Remove potential SQL injection patterns
    const sqlPatterns = /(\b(select|insert|update|delete|drop|union|exec|declare)\b)|([;()])/gi;
    
    // Remove potential NoSQL injection patterns
    const noSqlPatterns = /(\$|{|})/g;
    
    return input
      .replace(sqlPatterns, '')
      .replace(noSqlPatterns, '')
      .replace(/[<>]/g, ''); // Remove potential HTML tags
  }

  static validateAndSanitizeEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    return email.toLowerCase().trim();
  }
} 
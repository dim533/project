import { cn } from '../../lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive';
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300',
        variant === 'default' && 'bg-white/10 border border-white/20',
        variant === 'interactive' && 'bg-white/10 border border-white/20 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20',
        className
      )}
      {...props}
    />
  );
});

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    />
  );
});

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    />
  );
});

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4 bg-gray-50', className)}
      {...props}
    />
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
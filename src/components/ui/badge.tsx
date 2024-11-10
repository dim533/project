import { cn } from '../../lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'featured' | 'verified';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({
  className,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-300',
        {
          'default': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
          'outline': 'border border-emerald-500/30 text-emerald-400',
          'featured': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
          'verified': 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
        }[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };
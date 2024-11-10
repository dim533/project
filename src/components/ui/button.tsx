import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'default': 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30',
          'outline': 'border-2 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10',
          'ghost': 'text-white/70 hover:text-white hover:bg-white/10'
        }[variant],
        {
          'sm': 'h-9 px-4 text-sm',
          'md': 'h-11 px-6 text-base',
          'lg': 'h-12 px-8 text-lg'
        }[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
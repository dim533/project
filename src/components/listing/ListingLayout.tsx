import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ListingLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ListingLayout({ children, className }: ListingLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-slate-950", className)}>
      {children}
    </div>
  );
}

export function ListingContainer({ children, className }: ListingLayoutProps) {
  return (
    <div className={cn("container mx-auto px-6 -mt-20 relative", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {children}
      </div>
    </div>
  );
} 
import { Suspense } from 'react';
import { MembershipPlans } from './MembershipPlans';
import { ContactInfo } from './ContactInfo';
import { Skeleton } from '../ui/skeleton';

interface ListingSidebarProps {
  listing: Listing;
}

export function ListingSidebar({ listing }: ListingSidebarProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-[200px]" />}>
        <MembershipPlans />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <ContactInfo listing={listing} />
      </Suspense>
    </div>
  );
} 
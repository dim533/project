import { useQuery } from '@tanstack/react-query';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface ReviewsProps {
  listingId: string;
}

export function Reviews({ listingId }: ReviewsProps) {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Reviews</h2>
            <p className="text-white/70">Reviews coming soon</p>
          </div>
          <Button>Write a Review</Button>
        </div>
      </div>
    </Card>
  );
} 
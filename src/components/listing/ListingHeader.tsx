import { Heart, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ListingStats } from './ListingStats';

interface ListingHeaderProps {
  name: string;
  category: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onShare: () => void;
}

export function ListingHeader({ 
  name, 
  category, 
  isFavorite, 
  onFavoriteToggle, 
  onShare 
}: ListingHeaderProps) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="default" className="mb-2">
          {category}
        </Badge>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavoriteToggle}
            className={`${isFavorite ? 'text-red-500' : 'text-white/70'}`}
          >
            <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Share2 className="w-5 h-5 text-white/70" />
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {name}
      </h1>
      
      <ListingStats />
    </div>
  );
} 
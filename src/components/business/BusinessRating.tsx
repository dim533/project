interface BusinessRatingProps {
  rating: number;
  reviewCount: number;
}

export function BusinessRating({ rating, reviewCount }: BusinessRatingProps) {
  return (
    <div className="flex items-center">
      <Star className="w-4 h-4 text-yellow-400 fill-current" />
      <span className="ml-1 text-sm font-medium">{rating}</span>
      <span className="ml-1 text-sm text-gray-500">
        ({reviewCount})
      </span>
    </div>
  );
} 
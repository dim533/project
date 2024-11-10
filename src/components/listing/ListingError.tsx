import { Button } from "../ui/button";

interface ListingErrorProps {
  error: string | null;
  onBack: () => void;
}

export function ListingError({ error, onBack }: ListingErrorProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">
          {error || 'Listing not found'}
        </h1>
        <Button onClick={onBack}>Return to Home</Button>
      </div>
    </div>
  );
} 
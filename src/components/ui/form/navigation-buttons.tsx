import { Button } from '../button';
import { Loader2 } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  loading?: boolean;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  loading
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between gap-4">
      {currentStep > 0 ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
      ) : (
        <div className="w-24" />
      )}
      
      <Button
        type="submit"
        disabled={loading}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {currentStep === totalSteps - 1 ? 'Complete Registration' : 'Next Step'}
      </Button>
    </div>
  );
} 
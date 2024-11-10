import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="relative">
            {/* Step circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                index < currentStep
                  ? "bg-emerald-500 border-emerald-500"
                  : index === currentStep
                  ? "border-emerald-500 text-emerald-500"
                  : "border-white/20 text-white/20"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            
            {/* Step label */}
            <span
              className={cn(
                "absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap",
                index <= currentStep ? "text-white" : "text-white/50"
              )}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-2",
                index < currentStep
                  ? "bg-emerald-500"
                  : "bg-white/20"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
} 
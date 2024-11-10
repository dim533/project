import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema } from '../../../utils/validation';
import type { BusinessFormData } from '../../../types/business';
import { StepFields } from './StepFields';
import { ButtonGroup, Button } from '@chakra-ui/react';

interface BusinessFormProps {
  step: string;
  businessType: BusinessType;
  onSubmit: (data: BusinessFormData) => Promise<void>;
  onBack?: () => void;
  defaultValues?: Partial<BusinessFormData>;
  isLastStep?: boolean;
}

export function BusinessForm({ 
  step,
  businessType,
  onSubmit,
  onBack,
  defaultValues = {},
  isLastStep = false
}: BusinessFormProps) {
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues
  });

  const { isSubmitting } = form.formState;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <StepFields 
          step={step}
          businessType={businessType}
        />
        
        <ButtonGroup spacing={4} width="full" justifyContent="space-between">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
          >
            {isLastStep ? 'Complete Registration' : 'Next'}
          </Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
} 
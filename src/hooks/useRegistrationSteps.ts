import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessStepSchemas } from '../utils/validation/businessSchema';
import { useBusinessRegistration } from './useBusinessRegistration';
import { toast } from 'react-hot-toast';

export function useRegistrationSteps(businessType: string) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { registerBusiness, loading } = useBusinessRegistration();

  const handleStepSubmit = async (stepData: any, step: string) => {
    try {
      // Validate step data against schema
      const schema = businessStepSchemas[businessType][step];
      await schema.parseAsync(stepData);

      // Update form data
      const updatedData = { ...formData, [step]: stepData };
      setFormData(updatedData);

      // If final step, submit registration
      if (currentStep === getSteps(businessType).length - 1) {
        const result = await registerBusiness({
          ...updatedData,
          businessType
        });

        if (result.error) throw result.error;
        navigate('/verification-pending');
        return;
      }

      // Move to next step
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Step validation error:', error);
      toast.error(error.message || 'Please check all required fields');
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    handleStepSubmit,
    loading
  };
} 
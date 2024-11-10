import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Container,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  useSteps,
  useToast
} from '@chakra-ui/react';

import { businessStepSchemas } from '../../utils/validation';
import { useBusinessRegistration } from '../../contexts/BusinessRegistrationContext';
import { StepFields } from './StepFields';

const STEPS = {
  'personal-trainer': ['contact', 'qualifications', 'services', 'pricing'],
  'studio': ['contact', 'facility', 'services', 'pricing'],
  'gym': ['contact', 'facilities', 'memberships', 'pricing']
} as const;

function getSteps(businessType: keyof typeof STEPS) {
  return STEPS[businessType];
}

export function BusinessRegistrationSteps() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state, dispatch } = useBusinessRegistration();
  const { businessType, currentStep, formData } = state;

  const steps = getSteps(businessType as keyof typeof STEPS);
  const currentSchema = businessStepSchemas[businessType][steps[currentStep]];
  const { activeStep, setActiveStep } = useSteps({
    index: currentStep,
    count: steps.length
  });
  
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: formData[steps[currentStep]] || {}
  });

  const handleNext = async (data: any) => {
    try {
      console.log('Current step:', currentStep);
      console.log('Form data:', data);

      // Update form data in context with nested structure
      const stepData = {
        [steps[currentStep]]: data
      };
      
      dispatch({
        type: 'UPDATE_FORM_DATA',
        payload: stepData
      });

      // Move to next step
      dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
      
      // Reset form for next step
      const nextStepData = formData[steps[currentStep + 1]] || {};
      form.reset(nextStepData);
      
      toast.success('Step completed successfully!');
    } catch (error) {
      console.error('Form error:', error);
      toast.error('Please check all required fields');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
      // Reset form with previous step's values
      form.reset(formData[steps[currentStep - 1]] || {});
    }
  };

  // Reset form when step changes
  useEffect(() => {
    form.reset(formData[steps[currentStep]] || {});
  }, [currentStep, steps, formData, form]);

  return (
    <Box spacing={8}>
      <Stepper index={activeStep} colorScheme="green" mb={8}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{getStepTitle(step)}</StepTitle>
              <StepDescription>Step {index + 1}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Card variant="filled" bg="whiteAlpha.50">
        <CardBody>
          <form onSubmit={form.handleSubmit(handleNext)}>
            <StepFields
              step={steps[currentStep]}
              businessType={businessType}
              form={form}
            />
            
            <ButtonGroup mt={6} w="full" justifyContent="space-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                isDisabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={form.formState.isSubmitting}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              </Button>
            </ButtonGroup>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
} 
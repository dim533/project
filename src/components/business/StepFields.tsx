import { UseFormReturn } from 'react-hook-form';
import {
  VStack,
  Grid,
  IconButton,
  Button,
  Box,
  Heading,
  Text
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useFieldArray } from 'react-hook-form';
import { ErrorBoundary } from '../ErrorBoundary';
import { InputField, TextareaField, CheckboxField } from '../ui/form';

// Types
type BusinessType = 'gym' | 'studio' | 'personal-trainer';
type StepKey = `${BusinessType}-${string}`;

interface FieldArrayProps {
  form: UseFormReturn<BusinessFormData>;
  name: string;
}

interface StepFieldsProps {
  step: string;
  businessType: BusinessType;
  form: UseFormReturn<BusinessFormData>;
}

// Constants
const STEP_TITLES: Record<string, string> = {
  contact: 'Contact Information',
  qualifications: 'Professional Qualifications',
  services: 'Services Offered',
  pricing: 'Pricing Plans',
  facilities: 'Facility Details',
  facility: 'Facility Information',
  memberships: 'Membership Plans'
} as const;

// Step Components
function ContactFields({ form }: { form: UseFormReturn<BusinessFormData> }) {
  const { register, formState: { errors } } = form;
  
  return (
    <VStack spacing={4}>
      <InputField
        label="Business Name"
        name="business_name"
        register={register}
        error={errors.business_name?.message as string}
        placeholder="Enter your business name"
        required
      />
      
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message as string}
        placeholder="your@email.com"
        required
      />
      
      <InputField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message as string}
        placeholder="Create a secure password"
        required
      />
      
      <InputField
        label="Phone Number"
        name="contact_phone"
        register={register}
        error={errors.contact_phone?.message as string}
        placeholder="Your contact number"
        required
      />
      
      <InputField
        label="Website"
        name="website"
        register={register}
        error={errors.website?.message as string}
        placeholder="https://your-website.com"
      />
      
      <CheckboxField
        label="I accept the terms and conditions"
        name="termsAccepted"
        register={register}
        error={errors.termsAccepted?.message as string}
        required
      />
    </VStack>
  );
}

function QualificationsFields({ form }: { form: UseFormReturn<BusinessFormData> }) {
  const { register, formState: { errors } } = form;
  
  return (
    <VStack spacing={4}>
      <InputField
        label="Certifications"
        name="qualifications.certifications"
        register={register}
        error={errors.qualifications?.certifications?.message as string}
        placeholder="e.g., NASM CPT, ACE, ISSA"
        required
      />
      
      <TextareaField
        label="Experience"
        name="qualifications.experience"
        register={register}
        error={errors.qualifications?.experience?.message as string}
        placeholder="Describe your training experience..."
        required
      />
      
      <InputField
        label="Specializations"
        name="qualifications.specializations"
        register={register}
        error={errors.qualifications?.specializations?.message as string}
        placeholder="e.g., Weight Loss, Strength Training, Senior Fitness"
        required
      />
    </VStack>
  );
}

function ServicesFieldArray({ form, name }: FieldArrayProps) {
  const { control, register, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <VStack spacing={4} align="stretch">
      {fields.map((field, index) => (
        <Box
          key={field.id}
          p={4}
          bg="whiteAlpha.50"
          borderRadius="md"
          position="relative"
        >
          <Grid templateColumns="1fr auto" gap={4}>
            <InputField
              label="Service Name"
              name={`${name}.${index}.name`}
              register={register}
              error={errors.services?.offerings?.[index]?.name?.message as string}
              placeholder="Service name"
              required
            />
            
            <IconButton
              aria-label="Remove service"
              icon={<CloseIcon />}
              onClick={() => remove(index)}
              variant="ghost"
              colorScheme="red"
              alignSelf="end"
              size="sm"
            />
          </Grid>
        </Box>
      ))}
      
      <Button
        leftIcon={<AddIcon />}
        onClick={() => append({ name: '', price: '' })}
        variant="ghost"
        w="full"
      >
        Add Service
      </Button>
    </VStack>
  );
}

function StepError() {
  return (
    <Box p={4} borderRadius="lg" bg="red.500/10" borderColor="red.500/20" borderWidth={1}>
      <Text color="red.400" fontSize="sm">
        An error occurred loading this step. Please try refreshing the page.
      </Text>
    </Box>
  );
}

export function StepFields({ step, businessType, form }: StepFieldsProps) {
  const stepKey = `${businessType}-${step}` as StepKey;
  
  const stepMap: Record<StepKey, JSX.Element> = {
    'gym-contact': <ContactFields form={form} />,
    'studio-contact': <ContactFields form={form} />,
    'personal-trainer-contact': <ContactFields form={form} />,
    'gym-facilities': <ServicesFieldArray form={form} name="locations" />,
    'gym-memberships': <ServicesFieldArray form={form} name="memberships.plans" />,
    'personal-trainer-qualifications': <QualificationsFields form={form} />
  };

  const component = stepMap[stepKey];
  if (!component) {
    throw new Error(`Unknown step: ${stepKey}`);
  }

  return (
    <ErrorBoundary fallback={<StepError />}>
      <VStack spacing={6} align="stretch">
        <Heading size="md">{STEP_TITLES[step] || step}</Heading>
        {component}
      </VStack>
    </ErrorBoundary>
  );
}
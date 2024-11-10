import { UseFormReturn } from 'react-hook-form';
import { VStack } from '@chakra-ui/react';
import { InputField, CheckboxField } from '../fields';

interface ContactFieldsProps {
  form: UseFormReturn<BusinessFormData>;
}

export function ContactFields({ form }: ContactFieldsProps) {
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
      {/* Other contact fields... */}
    </VStack>
  );
} 
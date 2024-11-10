import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  InputProps,
  TextareaProps,
  Select,
  SelectProps,
  Checkbox,
  CheckboxProps
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

// Base types
interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  required?: boolean;
}

// Individual field components
export function InputField({ 
  label, 
  name, 
  error, 
  register, 
  required,
  ...props 
}: BaseFieldProps & InputProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name)}
        {...props}
        bg="whiteAlpha.50"
        borderColor="whiteAlpha.200"
        _hover={{ bg: 'whiteAlpha.100' }}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

// Export other field components... 
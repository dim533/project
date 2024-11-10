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

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  required?: boolean;
}

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

export function TextareaField({ 
  label, 
  name, 
  error, 
  register, 
  required,
  ...props 
}: BaseFieldProps & TextareaProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <Textarea
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

export function SelectField({ 
  label, 
  name, 
  error, 
  register, 
  required,
  children,
  ...props 
}: BaseFieldProps & SelectProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...register(name)}
        {...props}
        bg="whiteAlpha.50"
        borderColor="whiteAlpha.200"
        _hover={{ bg: 'whiteAlpha.100' }}
      >
        {children}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export function CheckboxField({ 
  label, 
  name, 
  error, 
  register, 
  required,
  ...props 
}: BaseFieldProps & CheckboxProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <Checkbox
        {...register(name)}
        {...props}
      >
        {label}
      </Checkbox>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
} 
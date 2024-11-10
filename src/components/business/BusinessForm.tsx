import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema, type BusinessFormData } from '../../utils/validation';
import { useBusinessMutation } from '../../hooks/useBusinessMutation';
import { FormField } from '../ui/form-field';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';

export function BusinessForm({ 
  initialData,
  onSuccess 
}: { 
  initialData?: Partial<BusinessFormData>;
  onSuccess?: () => void;
}) {
  const methods = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: initialData,
  });

  const { mutate: saveBusiness, isLoading } = useBusinessMutation();

  const onSubmit = async (data: BusinessFormData) => {
    try {
      await saveBusiness(data);
      toast.success('Business information saved successfully');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to save business information');
      console.error('Form submission error:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          label="Business Name"
          placeholder="Enter your business name"
        />

        <FormField
          name="description"
          label="Description"
          multiline
          rows={4}
          placeholder="Describe your business..."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            name="contact.email"
            label="Email"
            type="email"
            placeholder="contact@business.com"
          />

          <FormField
            name="contact.phone"
            label="Phone (optional)"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Additional form fields... */}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Business Information'}
        </Button>
      </form>
    </FormProvider>
  );
} 
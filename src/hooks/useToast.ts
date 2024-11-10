import { toast } from 'react-hot-toast';

export function useToast() {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (error: unknown) => {
    const message = error instanceof Error ? error.message : 'An error occurred';
    toast.error(message);
    console.error(error);
  };

  return { showSuccess, showError };
} 
import { toast } from 'react-toastify';

export const getAuthErrorMessage = (error: any) => {
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/email-already-in-use': 'This email is already registered',
    'auth/weak-password': 'Password should be at least 8 characters',
    'not-authorized': 'Please use a valid business email address',
    'default': 'An error occurred during registration'
  };

  if (error.message?.includes('not authorized')) {
    return errorMessages['not-authorized'];
  }

  return errorMessages[error.code] || errorMessages.default;
};

export const handleRegistrationError = (error: any) => {
  console.error('Registration error:', error);
  toast.error(getAuthErrorMessage(error));
}; 
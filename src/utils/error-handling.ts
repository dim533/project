export function handleError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export function createErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Incorrect password'
  };
  
  return errorMessages[code] || 'An error occurred';
} 
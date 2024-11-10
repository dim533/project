import { ErrorTracker } from './error-tracking';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const globalErrorHandler = (error: Error | AppError) => {
  const errorTracker = ErrorTracker.getInstance();

  if (error instanceof AppError) {
    errorTracker.captureError({
      message: error.message,
      code: error.code,
      context: error.context,
    });

    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Handle unexpected errors
  errorTracker.captureError(error);

  return {
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    statusCode: 500,
  };
}; 
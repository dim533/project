import * as Sentry from "@sentry/react";

interface ErrorDetails {
  message: string;
  code?: string;
  stack?: string;
  context?: Record<string, any>;
}

export class ErrorTracker {
  private static instance: ErrorTracker;
  private isInitialized: boolean = false;

  private constructor() {
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 1.0,
        beforeSend(event) {
          // Sanitize sensitive data before sending
          if (event.request?.headers) {
            delete event.request.headers['authorization'];
          }
          return event;
        },
      });
      this.isInitialized = true;
    }
  }

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  captureError(error: Error | ErrorDetails, context?: Record<string, any>) {
    if (!this.isInitialized) {
      console.error('Error tracker not initialized:', error);
      return;
    }

    if (error instanceof Error) {
      Sentry.captureException(error, {
        extra: context,
      });
    } else {
      Sentry.captureMessage(error.message, {
        level: 'error',
        extra: {
          ...error,
          ...context,
        },
      });
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
      if (context) console.error('Context:', context);
    }
  }

  setUser(user: { id: string; email?: string }) {
    if (this.isInitialized) {
      Sentry.setUser(user);
    }
  }

  clearUser() {
    if (this.isInitialized) {
      Sentry.setUser(null);
    }
  }
}

// Error boundary component
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error }) => (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-white/60 mb-4">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
} 
import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorDisplay } from '../ui/error-display';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class RegistrationErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Registration error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          title="Registration Error"
          message="We encountered an error during registration. Please try again or contact support if the problem persists."
        />
      );
    }

    return this.props.children;
  }
} 
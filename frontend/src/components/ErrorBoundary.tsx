// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details (could also send to an external logging service)
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can check if the error object has any GraphQL-specific properties
      const additionalDebug =
        (this.state.error as any)?.graphQLErrors
          ? JSON.stringify((this.state.error as any).graphQLErrors, null, 2)
          : '';

      return (
        <div className="p-4 m-4 border border-red-500 text-red-500">
          <h1>Something went wrong.</h1>
          <p>Error: {this.state.error?.message}</p>
          {this.state.error?.stack && (
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85em' }}>
              {this.state.error.stack}
            </pre>
          )}
          {this.state.errorInfo && (
            <>
              <h2>Component Stack:</h2>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85em' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </>
          )}
          {additionalDebug && (
            <>
              <h2>GraphQL Error Details:</h2>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85em' }}>
                {additionalDebug}
              </pre>
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

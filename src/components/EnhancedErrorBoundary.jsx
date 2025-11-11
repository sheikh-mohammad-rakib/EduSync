import React from "react";
import * as Sentry from "@sentry/react";

class EnhancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Capture error with Sentry
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
      tags: {
        section: 'error_boundary',
      },
    });

    this.setState({
      errorInfo,
      eventId,
    });
  }

  handleReportFeedback = () => {
    if (this.state.eventId) {
      Sentry.showReportDialog({ eventId: this.state.eventId });
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient dark:bg-gray-950 dark:text-gray-100 px-4">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
            Oops! Something went wrong
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-md">
            We're sorry for the inconvenience. Our team has been automatically notified and is working to fix this issue.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 max-w-2xl w-full">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-red-500 dark:text-red-300 bg-red-50 dark:bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button 
              onClick={this.handleReload}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              🔄 Reload Page
            </button>
            
            <button 
              onClick={this.handleGoHome}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              🏠 Go Home
            </button>
          </div>

          {/* Report Feedback Button (Production) */}
          {process.env.NODE_ENV === 'production' && this.state.eventId && (
            <button 
              onClick={this.handleReportFeedback}
              className="mt-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            >
              📝 Report this issue
            </button>
          )}

          {/* Error ID for Support */}
          {this.state.eventId && (
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              Error ID: {this.state.eventId}
            </p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;

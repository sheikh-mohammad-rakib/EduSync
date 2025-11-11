import * as Sentry from "@sentry/react";
import EnhancedErrorBoundary from "./EnhancedErrorBoundary";

// HOC for easier Sentry integration
export const withErrorBoundary = (Component, fallback) => {
  return Sentry.withErrorBoundary(Component, {
    fallback: fallback || EnhancedErrorBoundary,
    showDialog: true,
  });
};

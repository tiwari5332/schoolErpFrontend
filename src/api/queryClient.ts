import { QueryClient } from '@tanstack/react-query';

/**
 * Production-grade TanStack QueryClient instance.
 * Centralized defaults for stale times, garbage collection, retries, and refetch behavior.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes: Data is considered fresh for 5 mins before background refetch
      gcTime: 10 * 60 * 1000,    // 10 minutes: Unused query cache is garbage-collected after 10 mins
      retry: 1,                 // Retry failed queries once before marking error
      refetchOnWindowFocus: false, // Prevent unnecessary refetches on tab focus
      refetchOnReconnect: true,  // Auto-refetch when network connectivity recovers
    },
    mutations: {
      retry: 0,                 // Do not auto-retry mutations to prevent duplicate side effects
    },
  },
});

export default queryClient;

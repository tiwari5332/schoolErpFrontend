import React from 'react';
import { AdminDashboardFeature } from '@/features/admin-dashboard';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function DashboardPage() {
  return (
    <ErrorBoundary title="Error loading Admin Dashboard">
      <AdminDashboardFeature />
    </ErrorBoundary>
  );
}

'use client';

import React from 'react';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, user }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header user={user} />

      {/* Page content */}
      <main className="pt-20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};
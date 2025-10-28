'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Beranda
            </Link>
            <Link 
              href="/dashboard/portfolio" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Portofolio
            </Link>
            <Link 
              href="/dashboard/categories" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Kategori
            </Link>
          </nav>
        </div>

        {/* Right side - User info and logout */}
        <div className="flex items-center space-x-3">
          {/* User info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</p>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <nav className="px-4 py-2 space-y-1">
          <Link 
            href="/dashboard" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
          >
            Beranda
          </Link>
          <Link 
            href="/dashboard/portfolio" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
          >
            Portofolio
          </Link>
        </nav>
      </div>
    </header>
  );
};
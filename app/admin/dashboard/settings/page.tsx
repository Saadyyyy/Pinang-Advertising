'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';

interface User {
  name: string;
  email: string;
  role: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' }
  ];

  if (loading) {
    return (
      <DashboardLayout user={user || undefined}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user || undefined}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Kelola pengaturan sistem dan preferensi Anda</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <Card>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <Card title="General Settings" subtitle="Pengaturan umum sistem">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Admin Panel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site URL
                        </label>
                        <input
                          type="url"
                          defaultValue="https://admin.example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Admin panel untuk mengelola sistem"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                          <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                          <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="id">Bahasa Indonesia</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="System Preferences" subtitle="Preferensi sistem">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                        <p className="text-sm text-gray-500">Aktifkan mode maintenance untuk sistem</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Debug Mode</h4>
                        <p className="text-sm text-gray-500">Tampilkan informasi debug</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Auto Backup</h4>
                        <p className="text-sm text-gray-500">Backup otomatis database harian</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card title="Security Settings" subtitle="Pengaturan keamanan sistem">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">Aktifkan 2FA untuk keamanan tambahan</p>
                          <p className="text-xs text-gray-500 mt-1">Gunakan aplikasi authenticator</p>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Login Sessions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Current Session</p>
                            <p className="text-xs text-gray-500">Chrome on macOS • Jakarta, Indonesia</p>
                          </div>
                          <span className="text-xs text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Mobile Session</p>
                            <p className="text-xs text-gray-500">Safari on iOS • 2 hours ago</p>
                          </div>
                          <button className="text-xs text-red-600 hover:text-red-800">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card title="Notification Settings" subtitle="Kelola preferensi notifikasi">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">New User Registration</p>
                            <p className="text-xs text-gray-500">Notifikasi saat ada user baru</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">System Alerts</p>
                            <p className="text-xs text-gray-500">Alert sistem dan error</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                            <p className="text-xs text-gray-500">Laporan mingguan sistem</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Push Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Browser Notifications</p>
                            <p className="text-xs text-gray-500">Notifikasi di browser</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <Card title="Appearance Settings" subtitle="Kustomisasi tampilan dashboard">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Theme</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-2 border-blue-500 rounded-lg p-4 cursor-pointer">
                          <div className="w-full h-20 bg-white border rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Light</p>
                        </div>
                        <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400">
                          <div className="w-full h-20 bg-gray-800 border rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Dark</p>
                        </div>
                        <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400">
                          <div className="w-full h-20 bg-gradient-to-br from-white to-gray-800 border rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Auto</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Color Scheme</h4>
                      <div className="flex space-x-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full cursor-pointer ring-2 ring-blue-600 ring-offset-2"></div>
                        <div className="w-8 h-8 bg-green-600 rounded-full cursor-pointer hover:ring-2 hover:ring-green-600 hover:ring-offset-2"></div>
                        <div className="w-8 h-8 bg-purple-600 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-600 hover:ring-offset-2"></div>
                        <div className="w-8 h-8 bg-red-600 rounded-full cursor-pointer hover:ring-2 hover:ring-red-600 hover:ring-offset-2"></div>
                        <div className="w-8 h-8 bg-orange-600 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-600 hover:ring-offset-2"></div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Layout Options</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Compact Mode</p>
                            <p className="text-xs text-gray-500">Tampilan lebih padat</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Sidebar Auto-hide</p>
                            <p className="text-xs text-gray-500">Sembunyikan sidebar otomatis</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
import React from 'react';
import { Palette, Bell, Volume2, Moon, Sun, Smartphone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../types';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, themes } = useTheme();

  const themeOptions: { value: Theme; label: string; color: string }[] = [
    { value: 'blue', label: 'Ocean Blue', color: '#3B82F6' },
    { value: 'green', label: 'Forest Green', color: '#10B981' },
    { value: 'purple', label: 'Royal Purple', color: '#8B5CF6' },
    { value: 'orange', label: 'Sunset Orange', color: '#F59E0B' },
    { value: 'pink', label: 'Cherry Pink', color: '#EC4899' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-xl text-gray-600">Customize your Fresh-Hub experience</p>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Palette className="h-6 w-6 text-blue-600" />
            <span>Theme & Appearance</span>
          </h2>

          {/* Theme Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Theme Color
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {themeOptions.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => updateSettings({ theme: theme.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    settings.theme === theme.value
                      ? 'border-gray-400 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3"
                    style={{ backgroundColor: theme.color }}
                  />
                  <div className="text-sm font-medium text-gray-900">{theme.label}</div>
                  {settings.theme === theme.value && (
                    <div className="mt-2 text-xs text-blue-600 font-medium">Current</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {settings.darkMode ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600" />
              )}
              <div>
                <div className="font-medium text-gray-900">Dark Mode</div>
                <div className="text-sm text-gray-600">
                  Switch between light and dark themes
                </div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Bell className="h-6 w-6 text-green-600" />
            <span>Notifications</span>
          </h2>

          <div className="space-y-4">
            {/* Push Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Push Notifications</div>
                  <div className="text-sm text-gray-600">
                    Receive notifications about new tests and updates
                  </div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ notifications: !settings.notifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Sound Effects</div>
                  <div className="text-sm text-gray-600">
                    Play sounds for actions and notifications
                  </div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Smartphone className="h-6 w-6 text-purple-600" />
            <span>App Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700">App Version</div>
                <div className="text-lg text-gray-900">1.0.0</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Last Updated</div>
                <div className="text-lg text-gray-900">January 2025</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700">Developer</div>
                <div className="text-lg text-gray-900">Fresh-Hub Team</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Support</div>
                <div className="text-lg text-gray-900">+251994024681</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">About Fresh-Hub</h3>
            <p className="text-blue-800 text-sm">
              Fresh-Hub is your ultimate exam preparation platform, designed specifically for Ethiopian students. 
              We provide comprehensive study materials, practice tests, and interactive features to help you 
              excel in your Mid and Final exams from 2021-2025.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Offline & Online Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Real-time Progress Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Interactive Chat System</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Comprehensive Leaderboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Premium Study Materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Multiple Theme Options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
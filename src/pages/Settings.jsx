import React, { useState } from "react";

export default function Settings({ user }) {
  const [settings, setSettings] = useState({
    // Appearance
    theme: 'dark',
    fontSize: 'medium',
    animationsEnabled: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyDigest: true,
    
    // Privacy
    profileVisible: true,
    shareProgress: false,
    analyticsEnabled: true,
    
    // Task Management
    defaultEnergyLevel: 'medium',
    autoArchiveCompleted: true,
    showTaskStats: true,
    priorityAlgorithm: 'smart'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would save to your backend
    setHasChanges(false);
    // Show success notification
  };

  const handleReset = () => {
    // Reset to defaults
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-mesh py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Settings
          </h1>
          <p className="text-xl text-white/80">
            Customize your EduSync experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Settings Panel */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Appearance Settings */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-elevated rounded-3xl p-8 backdrop-blur-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
                <span className="text-3xl">🎨</span>
                <span>Appearance</span>
              </h2>
              
              <div className="space-y-6">
                
                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Theme Preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handleChange('theme', theme)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          settings.theme === theme
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🔄'}
                          </div>
                          <div className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                            {theme}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleChange('fontSize', size)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          settings.fontSize === size
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className={`text-center font-medium ${
                          size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'
                        }`}>
                          {size === 'small' ? 'Aa' : size === 'large' ? 'Aa' : 'Aa'}
                        </div>
                        <div className="text-xs capitalize mt-1 text-gray-600 dark:text-gray-400">
                          {size}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animations Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Enable Animations
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Smooth transitions and effects
                    </div>
                  </div>
                  <button
                    onClick={() => handleChange('animationsEnabled', !settings.animationsEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.animationsEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Notifications Settings */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-elevated rounded-3xl p-8 backdrop-blur-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
                <span className="text-3xl">🔔</span>
                <span>Notifications</span>
              </h2>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile notifications' },
                  { key: 'taskReminders', label: 'Task Reminders', desc: 'Alerts for upcoming deadlines' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your progress' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </div>
                    </div>
                    <button
                      onClick={() => handleChange(item.key, !settings[item.key])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[item.key] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Task Management Settings */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-elevated rounded-3xl p-8 backdrop-blur-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
                <span className="text-3xl">📋</span>
                <span>Task Management</span>
              </h2>
              
              <div className="space-y-6">
                
                {/* Default Energy Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Default Energy Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleChange('defaultEnergyLevel', level)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          settings.defaultEnergyLevel === level
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {level === 'low' ? '🔋' : level === 'medium' ? '⚡' : '🚀'}
                          </div>
                          <div className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                            {level}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Task Settings */}
                <div className="space-y-4">
                  {[
                    { key: 'autoArchiveCompleted', label: 'Auto-archive completed tasks', desc: 'Move finished tasks to archive automatically' },
                    { key: 'showTaskStats', label: 'Show task statistics', desc: 'Display progress charts and metrics' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {item.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.desc}
                        </div>
                      </div>
                      <button
                        onClick={() => handleChange(item.key, !settings[item.key])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[item.key] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Save Changes Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card-elevated rounded-3xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Save Changes
              </h3>
              
              {hasChanges && (
                <div className="mb-4 p-3 bg-warning-50 dark:bg-warning-900/20 rounded-xl">
                  <div className="text-sm text-warning-700 dark:text-warning-300">
                    You have unsaved changes
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    hasChanges
                      ? 'btn-primary hover:scale-105'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Save Changes
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Reset to Defaults
                </button>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card-elevated rounded-3xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Account Information
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {user?.email || 'Not logged in'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member since:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    Free
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="/profile"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Edit Profile
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Data & Privacy */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card-elevated rounded-3xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Data & Privacy
              </h3>
              
              <div className="space-y-3">
                <button className="flex items-center space-x-3 w-full p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-left">
                  <span className="text-xl">📊</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Export Data
                  </span>
                </button>
                
                <button className="flex items-center space-x-3 w-full p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-left">
                  <span className="text-xl">🗑️</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Delete Account
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

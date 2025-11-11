import React, { useState } from "react";

export default function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Passionate learner focused on growth and achievement.",
    location: "Remote",
    joinDate: new Date(user?.$createdAt || Date.now()).toLocaleDateString(),
    preferences: {
      theme: "dark",
      notifications: true,
      emailUpdates: false
    }
  });

  const [stats] = useState({
    tasksCompleted: 42,
    totalTasks: 67,
    streak: 7,
    totalPoints: 1250
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
  };

  const completionRate = Math.round((stats.tasksCompleted / stats.totalTasks) * 100);

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
            Your Profile
          </h1>
          <p className="text-xl text-white/80">
            Manage your account and track your progress
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card-elevated rounded-3xl p-8 backdrop-blur-lg">
              
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-glow">
                      {profile.name?.charAt(0) || profile.email?.charAt(0) || 'U'}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {profile.name || 'User'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {profile.email}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <span>📍</span>
                        <span>{profile.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>Joined {profile.joinDate}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Basic Information
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                        className="input-field w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled={true}
                        className="input-field w-full opacity-60"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="input-field w-full resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="input-field w-full"
                    placeholder="Where are you based?"
                  />
                </div>

                {/* Save Button */}
                {isEditing && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                  >
                    <button
                      onClick={handleSave}
                      className="btn-primary px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-elevated rounded-3xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Your Progress
              </h3>
              
              <div className="space-y-4">
                
                {/* Completion Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Completion Rate
                    </span>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {completionRate}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill bg-gradient-to-r from-primary-500 to-secondary-500"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {stats.tasksCompleted}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Completed
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                      {stats.streak}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Day Streak
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-success-50 dark:bg-success-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                      {stats.totalPoints}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Points
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-accent-50 dark:bg-accent-900/20 rounded-2xl">
                    <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                      {stats.totalTasks}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total Tasks
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-elevated rounded-3xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Recent Achievements
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-warning-50 dark:bg-warning-900/20 rounded-xl">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-medium text-warning-700 dark:text-warning-300">
                      First Week
                    </div>
                    <div className="text-xs text-warning-600 dark:text-warning-400">
                      Completed 7 days
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-success-50 dark:bg-success-900/20 rounded-xl">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <div className="font-medium text-success-700 dark:text-success-300">
                      Quick Learner
                    </div>
                    <div className="text-xs text-success-600 dark:text-success-400">
                      Finished 10 tasks
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-medium text-primary-700 dark:text-primary-300">
                      Organized
                    </div>
                    <div className="text-xs text-primary-600 dark:text-primary-400">
                      Set priorities
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card-elevated rounded-3xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <a
                  href="/tasks"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-xl">📋</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    View Tasks
                  </span>
                </a>
                
                <a
                  href="/settings"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-xl">⚙️</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Settings
                  </span>
                </a>
                
                <a
                  href="/contact"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-xl">💬</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Contact Us
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

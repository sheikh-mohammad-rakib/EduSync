import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout, onShowSignup, onShowLogin, showContactLink }) {
  const [dark, setDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function toggleDark() {
    setDark((d) => !d);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/tasks", label: "Tasks", icon: "📋" },
    ...(showContactLink ? [{ path: "/contact", label: "Contact", icon: "📞" }] : []),
    { path: "/task-and-file-demo", label: "Demo", icon: "🚀" },
  ];

  return (
    <nav className="glass-effect dark:glass-dark sticky top-0 z-50 border-b border-white/20 dark:border-gray-700/30 animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                E
              </div>
              <span className="text-lg sm:text-2xl font-display font-bold text-gradient group-hover:scale-105 transition-transform duration-300 hidden xs:block">
                EduSync
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : "text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg sm:rounded-xl bg-white/20 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 touch-target"
              title="Toggle theme"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {dark ? '🌙' : '☀️'}
              </div>
            </button>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-white/20 dark:bg-gray-800/50">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 max-w-20 sm:max-w-32 truncate">
                    {user.name || user.email}
                  </span>
                </div>
                <button 
                  onClick={onLogout} 
                  className="btn-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 touch-target"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button 
                  onClick={onShowLogin} 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-white/20 dark:hover:bg-gray-800/50 rounded-lg sm:rounded-xl transition-all duration-300 touch-target"
                >
                  Login
                </button>
                <button 
                  onClick={onShowSignup} 
                  className="btn-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 touch-target"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg sm:rounded-xl bg-white/20 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 touch-target"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 pb-3 sm:pb-4' : 'max-h-0'}`}>
          <div className="space-y-2 pt-3 sm:pt-4 border-t border-white/20 dark:border-gray-700/30">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 touch-target ${
                  isActive(link.path)
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/50"
                }`}
              >
                <span className="text-base sm:text-lg">{link.icon}</span>
                <span className="text-sm sm:text-base">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

const PrioritizedTasks = lazy(() => import("./pages/PrioritizedTasks"));
const TaskAndFileDemo = lazy(() => import("./pages/TaskAndFileDemo"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

import { useEffect, useState } from "react";
import { account } from "./lib/appwrite";
import { logout } from "./lib/logout";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/EnhancedErrorBoundary";
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Footer = lazy(() => import("./components/Footer"));
const Contact = lazy(() => import("./pages/Contact"));

function Home({ onLogout, user }) {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center py-8 px-4 sm:py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-96 sm:h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-64 h-64 sm:w-96 sm:h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-glow animate-glow">
            <span className="text-2xl sm:text-3xl font-bold text-white">E</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              EduSync
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Revolutionize your learning with AI-powered task prioritization and seamless organization
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto">
            <div className="card-elevated rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-lg text-center hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl">🧠</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Smart Prioritization</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">AI-driven task ordering based on your energy and deadlines</p>
            </div>
            
            <div className="card-elevated rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-lg text-center hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Progress Tracking</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Visual progress indicators and completion analytics</p>
            </div>
            
            <div className="card-elevated rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-lg text-center hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl">🌙</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Adaptive Design</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Beautiful dark mode and responsive interface</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4">
            <a 
              href="/tasks" 
              className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white shadow-large hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1 text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 touch-target"
            >
              <span>🚀</span>
              <span>Explore Tasks</span>
            </a>
            
            {user && (
              <button 
                onClick={onLogout} 
                className="w-full sm:w-auto btn-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white shadow-large hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 touch-target"
              >
                <span>👋</span>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* User Welcome Message */}
        {user && (
          <div className="card-elevated rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-lg animate-slideUp mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Welcome back, {user.name || 'User'}! 👋
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Ready to tackle your tasks with renewed focus?
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <a
                href="/tasks"
                className="flex items-center space-x-3 p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl sm:rounded-2xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200 touch-target"
              >
                <span className="text-xl sm:text-2xl">📋</span>
                <div>
                  <h4 className="font-semibold text-primary-700 dark:text-primary-300 text-sm sm:text-base">View Tasks</h4>
                  <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400">Check your smart queue</p>
                </div>
              </a>
              
              <a
                href="/task-and-file-demo"
                className="flex items-center space-x-3 p-3 sm:p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-xl sm:rounded-2xl hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200 touch-target"
              >
                <span className="text-xl sm:text-2xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-secondary-700 dark:text-secondary-300 text-sm sm:text-base">Try Demo</h4>
                  <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">Explore features</p>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Stats or Social Proof */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-xl sm:max-w-2xl mx-auto animate-fadeInUp px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">10K+</div>
            <div className="text-white/70 text-xs sm:text-sm">Tasks Organized</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">500+</div>
            <div className="text-white/70 text-xs sm:text-sm">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">98%</div>
            <div className="text-white/70 text-xs sm:text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./App.css";

function NotFound() {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center py-8 px-4 sm:py-12">
      <div className="text-center animate-fadeInUp w-full">
        <div className="card-elevated rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-12 sm:py-16 max-w-sm sm:max-w-lg w-full backdrop-blur-lg mx-auto">
          
          {/* 404 Animation */}
          <div className="relative mb-6 sm:mb-8">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-gradient animate-bounce-gentle">
              404
            </div>
            <div className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-white/10 animate-pulse">
              404
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed px-2">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
          
          <div className="space-y-3 sm:space-y-4">
            <a 
              href="/" 
              className="btn-primary inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white shadow-large hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto justify-center touch-target"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Return Home</span>
            </a>
            
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">
              Or try going to <a href="/tasks" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 font-medium">your tasks</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center">
      <div className="text-center animate-fadeInUp">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
          <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Loading EduSync</h3>
        <p className="text-white/70">Preparing your personalized experience...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const u = await account.get();
        setUser(u);
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await logout();
    // Clear user context from error tracking
    if (typeof window !== 'undefined' && window.errorLogger) {
      window.errorLogger.clearUserContext();
    }
    setUser(null);
  }

  function AnimatedRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Redirect to /tasks after login, but only if on / or /login or /signup
    useEffect(() => {
      if (user && !loading && ["/", "/login", "/signup"].includes(location.pathname)) {
        navigate("/tasks");
      }
    }, [navigate, location.pathname]);

    return (
      <AnimatePresence mode="wait">
        <div
          key={location.pathname}
          className="flex-1 flex flex-col"
        >
          <Suspense fallback={<LoadingSpinner />}>
            {loading ? (
              <LoadingSpinner />
            ) : !user ? (
              showSignup ? (
                <Signup onSignup={setUser} onShowLogin={() => setShowSignup(false)} />
              ) : (
                <Login onLogin={setUser} onShowSignup={() => setShowSignup(true)} />
              )
            ) : (
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home onLogout={handleLogout} user={user} />} />
                <Route path="/tasks" element={<PrioritizedTasks />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/settings" element={<Settings user={user} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/task-and-file-demo" element={<TaskAndFileDemo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </Suspense>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        {/* Skip navigation link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-primary-700 text-white px-4 py-2 rounded z-50 focus:outline-2 focus:outline-primary-900" tabIndex="0">Skip to main content</a>
        
        <div className="min-h-screen flex flex-col bg-mesh">
          {(user || (!loading && !user && !["/", "/login", "/signup"].includes(window.location.pathname))) && (
            <Navbar
              user={user}
              onLogout={handleLogout}
              onShowSignup={() => setShowSignup(true)}
              onShowLogin={() => setShowSignup(false)}
              showContactLink={true}
            />
          )}
          
          {/* Main content anchor for skip link */}
          <div id="main-content" tabIndex={-1} className="outline-none flex-1 flex flex-col" role="main">
            <AnimatedRoutes />
          </div>
          
          {(user || (!loading && !user && !["/", "/login", "/signup"].includes(window.location.pathname))) && (
            <Footer />
          )}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

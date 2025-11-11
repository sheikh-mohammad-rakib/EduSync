import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "GitHub", icon: "💻", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" },
  ];

  const quickLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Support", url: "#" },
  ];

  return (
    <footer className="relative mt-auto">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 opacity-90"></div>
      
      {/* Glass effect overlay */}
      <div className="relative glass-effect border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-8 sm:py-12">
            {/* Brand Section */}
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">E</span>
                </div>
                <span className="text-xl sm:text-2xl font-display font-bold text-white">EduSync</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-md">
                Streamline your educational journey with intelligent task prioritization and seamless organization. 
                Built for students, by students.
              </p>
              <div className="flex space-x-2 sm:space-x-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110 touch-target"
                    title={link.name}
                  >
                    <span className="text-base sm:text-lg">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-300 hover:translate-x-1 inline-block touch-target"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Features</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Smart Task Prioritization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Progress Tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>🌙</span>
                  <span>Dark Mode Support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>Mobile Responsive</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-white/70 text-xs sm:text-sm font-medium text-center sm:text-left">
                &copy; {currentYear} EduSync. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-white/70">
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <span>❤️</span>
                  <span>Made with love for students</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
    </footer>
  );
}

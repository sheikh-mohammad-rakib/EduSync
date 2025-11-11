# EduSync 🎓✨

<div align="center">

![EduSync Logo](https://via.placeholder.com/200x100/4F46E5/FFFFFF?text=EduSync)

**Smart Task Management for Educational Excellence**

[![GitHub stars](https://img.shields.io/github/stars/sheikh-mohammad-rakib/EduSync?style=social)](https://github.com/sheikh-mohammad-rakib/EduSync/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sheikh-mohammad-rakib/EduSync?style=social)](https://github.com/sheikh-mohammad-rakib/EduSync/network/members)
[![GitHub issues](https://img.shields.io/github/issues/sheikh-mohammad-rakib/EduSync)](https://github.com/sheikh-mohammad-rakib/EduSync/issues)
[![GitHub license](https://img.shields.io/github/license/sheikh-mohammad-rakib/EduSync)](https://github.com/sheikh-mohammad-rakib/EduSync/blob/main/LICENSE)

[Live Demo](https://edusync-demo.vercel.app) | [Documentation](./docs) | [Contributing](./CONTRIBUTING.md) | [Report Bug](https://github.com/sheikh-mohammad-rakib/EduSync/issues)

</div>

---

## 🚀 About EduSync

EduSync is a cutting-edge React application that revolutionizes educational task management through AI-powered prioritization and intelligent workflow optimization. Built with modern web technologies, it provides educators and students with an intuitive platform for seamless organization and productivity enhancement.

### ✨ Key Highlights

- 🤖 **AI-Powered Prioritization**: Smart task ordering based on deadlines, energy levels, and importance
- 🌙 **Beautiful Dark Mode**: Elegant interface with responsive design for all devices
- 📊 **Progress Tracking**: Visual indicators and completion analytics
- 🔐 **Secure Authentication**: Robust user management with Appwrite
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern UI**: Glass-morphism effects and smooth animations

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer) |
| **Backend** | ![Appwrite](https://img.shields.io/badge/Appwrite-18-FD366E?logo=appwrite) |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter) |
| **UI Components** | ![Radix UI](https://img.shields.io/badge/Radix_UI-3-161618?logo=radixui) |
| **Testing** | ![Playwright](https://img.shields.io/badge/Playwright-1.54-2EAD33?logo=playwright) |
| **Monitoring** | ![Sentry](https://img.shields.io/badge/Sentry-10-362D59?logo=sentry) |

</div>

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sheikh-mohammad-rakib/EduSync.git
   cd EduSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Appwrite configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see EduSync in action! 🎉

## 📝 Available Scripts

## 📝 Available Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | 🚀 Start development server | Development with hot reload |
| `npm run build` | 📦 Build for production | Optimized production build |
| `npm run preview` | 👀 Preview production build | Test production build locally |
| `npm run lint` | 🔍 Run ESLint | Code quality and style checks |
| `npx playwright test` | 🧪 Run E2E tests | Automated testing suite |

## 🧪 Testing

### End-to-End Testing with Playwright

Run comprehensive E2E tests across multiple browsers:

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test edusync-production-tests.spec.ts

# Generate test report
npx playwright show-report
```

### Test Coverage

- ✅ Authentication flows
- ✅ Task management features
- ✅ Responsive design validation
- ✅ Accessibility compliance
- ✅ Performance benchmarks

## 🏗️ Project Structure

```
EduSync/
├── 📁 src/
│   ├── 📄 App.jsx              # Main application component
│   ├── 📄 main.jsx             # Application entry point
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 pages/               # Route-based page components
│   └── 📁 lib/                 # Utilities and configurations
├── 📁 e2e/                     # Playwright test suites
├── 📁 public/                  # Static assets
├── 📁 docs/                    # Project documentation
├── 📄 package.json             # Dependencies and scripts
├── 📄 vite.config.js           # Vite configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
└── 📄 playwright.config.js     # Playwright test configuration
```

## 🌟 Features in Detail

### 🤖 AI-Powered Task Prioritization
- Intelligent ordering based on multiple factors
- Energy level optimization
- Deadline-aware scheduling
- Adaptive learning from user behavior

### 🎨 Modern User Interface
- Glass-morphism design effects
- Smooth animations with Framer Motion
- Dark/light mode toggle
- Mobile-first responsive design

### 🔐 Secure Authentication
- User registration and login
- Session management
- Password reset functionality
- Profile customization

### 📊 Analytics & Progress Tracking
- Task completion metrics
- Productivity insights
- Visual progress indicators
- Performance analytics

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
3. **Deploy** 🚀

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```
2. **Deploy** the `dist` folder to Netlify

### Docker

```dockerfile
# Dockerfile included in repository
docker build -t edusync .
docker run -p 3000:3000 edusync
```

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Vite Team](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Appwrite](https://appwrite.io/) for backend services
- [Playwright](https://playwright.dev/) for reliable testing

## 📞 Support & Contact

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/sheikh-mohammad-rakib/EduSync/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/sheikh-mohammad-rakib/EduSync/discussions)
- 📧 **Email**: [maintainer@edusync.dev](mailto:maintainer@edusync.dev)
- 💬 **Discord**: [Join our community](https://discord.gg/edusync)

---

<div align="center">

**Made with ❤️ by the EduSync Team**

⭐ Star us on GitHub if you find EduSync helpful!

[⬆ Back to Top](#edusync-)

</div>

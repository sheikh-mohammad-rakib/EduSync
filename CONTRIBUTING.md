# Contributing to EduSync 🤝

<div align="center">

![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**Thank you for your interest in contributing to EduSync!** 🎉

</div>

We welcome contributions from everyone and are grateful for every contribution, no matter how small. This document provides guidelines to help us maintain a high-quality, collaborative project.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🎯 Ways to Contribute](#-ways-to-contribute)
- [🛠️ Development Setup](#️-development-setup)
- [📝 Coding Standards](#-coding-standards)
- [🧪 Testing Guidelines](#-testing-guidelines)
- [📥 Pull Request Process](#-pull-request-process)
- [🐛 Bug Reporting](#-bug-reporting)
- [💡 Feature Requests](#-feature-requests)
- [🏆 Recognition](#-recognition)

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Git** for version control
- **Code Editor** (VS Code recommended)
- **GitHub Account** for submitting PRs

### Setup in 5 Minutes

1. **Fork & Clone**
   ```bash
   # Fork the repo on GitHub, then:
   git clone https://github.com/YOUR-USERNAME/EduSync.git
   cd EduSync
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-awesome-feature
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

5. **Make Your Changes** ✨

## 🎯 Ways to Contribute

| Type | Description | Good For |
|------|-------------|----------|
| 🐛 **Bug Fixes** | Fix existing issues | First-time contributors |
| ✨ **Features** | Add new functionality | Experienced developers |
| 📚 **Documentation** | Improve docs/README | Technical writers |
| 🎨 **UI/UX** | Design improvements | Designers |
| 🧪 **Testing** | Add/improve tests | QA engineers |
| 🔧 **Refactoring** | Code improvements | Senior developers |

## 🛠️ Development Setup

### Environment Configuration

1. **Copy Environment File**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure Appwrite** (if working on backend features)
   ```env
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   ```

3. **Install Recommended VS Code Extensions**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Prettier - Code formatter
   - ESLint

### Development Workflow

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run tests
npx playwright test

# Build for production
npm run build
```

## 📝 Coding Standards

## 📝 Coding Standards

### JavaScript/React Guidelines

- ✅ **Use functional components** with hooks over class components
- ✅ **Follow ESLint rules** - our configuration enforces best practices
- ✅ **Use meaningful names** for variables, functions, and components
- ✅ **Keep components small** and focused on single responsibility
- ✅ **Use TypeScript-style JSDoc** for complex functions

```jsx
// ✅ Good
const TaskCard = ({ task, onComplete }) => {
  const handleComplete = useCallback(() => {
    onComplete(task.id);
  }, [task.id, onComplete]);

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
};

// ❌ Avoid
function TaskCard(props) {
  return (
    <div>
      <h3>{props.task.title}</h3>
      <button onClick={() => props.onComplete(props.task.id)}>Complete</button>
    </div>
  );
}
```

### CSS/Styling Guidelines

- ✅ **Use Tailwind CSS classes** for styling
- ✅ **Follow mobile-first** responsive design
- ✅ **Use semantic HTML** elements
- ✅ **Maintain consistent spacing** using Tailwind's spacing scale

```jsx
// ✅ Good
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
  Click me
</button>

// ❌ Avoid inline styles
<button style={{padding: '8px 16px', backgroundColor: 'blue'}}>
  Click me
</button>
```

### Git Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format: type(scope): description

feat(auth): add social login with Google
fix(ui): resolve mobile navigation overflow
docs(readme): update installation instructions
test(tasks): add unit tests for task prioritization
refactor(components): simplify TaskCard component
style(css): fix indentation in App.css
chore(deps): update dependencies to latest versions
```

## 🧪 Testing Guidelines

### Writing Tests

- ✅ **Test user interactions** not implementation details
- ✅ **Use descriptive test names** that explain the behavior
- ✅ **Follow the AAA pattern** (Arrange, Act, Assert)
- ✅ **Test edge cases** and error scenarios

```javascript
// ✅ Good test example
test('should complete task when complete button is clicked', async ({ page }) => {
  // Arrange
  await page.goto('/tasks');
  await page.fill('[data-testid="task-title"]', 'Test Task');
  await page.click('[data-testid="add-task"]');
  
  // Act
  await page.click('[data-testid="complete-task"]');
  
  // Assert
  await expect(page.locator('[data-testid="completed-tasks"]')).toContainText('Test Task');
});
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests with UI
npx playwright test --ui

# Debug specific test
npx playwright test --debug login.spec.ts
```

## 📥 Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Tests pass locally (`npx playwright test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Changes are documented (if needed)
- [ ] Commits follow conventional commit format

### PR Template

When opening a PR, please include:

```markdown
## 📝 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## 🧪 Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## 📱 Screenshots (if applicable)
Before/after screenshots for UI changes

## 📋 Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks** - CI/CD pipeline runs tests
2. **Code Review** - Maintainers review your code
3. **Feedback** - Address any requested changes
4. **Approval** - PR gets approved and merged

## 🐛 Bug Reporting

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Try latest version** to see if it's already fixed
3. **Minimal reproduction** - create a simple example

### Bug Report Template

```markdown
**🐛 Bug Description**
Clear description of the bug

**🔄 Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**✅ Expected Behavior**
What should happen

**❌ Actual Behavior**
What actually happens

**🌍 Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., v1.2.3]

**📷 Screenshots**
If applicable, add screenshots
```

## 💡 Feature Requests

We love new ideas! Before submitting:

1. **Check existing discussions** for similar requests
2. **Consider the scope** - does it fit EduSync's mission?
3. **Provide use cases** - explain why it's valuable

### Feature Request Template

```markdown
**🚀 Feature Description**
Clear description of the feature

**🎯 Problem Statement**
What problem does this solve?

**💡 Proposed Solution**
How would you implement this?

**🔄 Alternative Solutions**
Other approaches considered

**📋 Additional Context**
Mockups, examples, references
```

## 🏆 Recognition

Contributors are the heart of EduSync! We recognize contributions through:

- 🌟 **Hall of Fame** in our documentation
- 🎖️ **Special badges** for significant contributions
- 📢 **Social media shoutouts** for major features
- 🎁 **Swag** for top contributors (coming soon!)

### Contribution Types We Celebrate

- 💻 Code contributions
- 📚 Documentation improvements  
- 🐛 Bug reports and fixes
- 💡 Feature suggestions
- 🎨 Design contributions
- 🧪 Testing improvements
- 🌍 Translations (future)

## 📞 Getting Help

### Stuck? We're Here to Help!

- 💬 **GitHub Discussions** - Ask questions and get help
- 🐛 **GitHub Issues** - Report bugs or request features  
- 📧 **Email** - [maintainer@edusync.dev](mailto:maintainer@edusync.dev)
- 🚀 **Discord** - Join our community (coming soon!)

### Mentorship Program

New to open source? We offer mentorship for:
- First-time contributors
- Students learning React
- Developers new to testing
- Anyone wanting to improve their skills

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Give constructive feedback
- Celebrate all contributions
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

---

<div align="center">

**Thank you for helping make EduSync better! 🙏**

*Every contribution, no matter how small, makes a difference.*

[⬆ Back to Top](#contributing-to-edusync-)

</div>
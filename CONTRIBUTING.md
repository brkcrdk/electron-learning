# Contributing to Electron + shadcn/ui Template

Thank you for your interest in contributing to this Electron + shadcn/ui template! We welcome contributions from the community and are pleased to have you join us.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** if available
3. **Provide clear reproduction steps** for bugs
4. **Include system information** (OS, Node.js version, etc.)

### Suggesting Features

We love feature suggestions! When proposing new features:

1. **Check if it fits the template's scope** - Keep it focused on Electron + shadcn/ui
2. **Explain the use case** - Why would this be useful?
3. **Consider maintenance** - Will this add significant complexity?

### Pull Requests

#### Before You Start

1. **Fork the repository** and create your branch from `main`
2. **Check existing PRs** to avoid duplicate work
3. **Open an issue first** for significant changes to discuss the approach

#### Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/electron-shadcn.git
   cd electron-shadcn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development**:
   ```bash
   npm start
   ```

#### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the coding standards**:
   - Use TypeScript for type safety
   - Follow existing code style and patterns
   - Use meaningful commit messages
   - Add comments for complex logic

3. **Test your changes**:
   - Ensure the app builds and runs correctly
   - Test on multiple platforms if possible
   - Run linting: `npm run lint`

4. **Update documentation** if needed:
   - Update README.md for new features
   - Add JSDoc comments for new functions
   - Update CHANGELOG.md

#### Commit Guidelines

We follow conventional commits for clear history:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples**:
```
feat: add dark mode toggle component
fix: resolve theme persistence issue
docs: update installation instructions
```

#### Pull Request Process

1. **Update documentation** as needed
2. **Add your changes to CHANGELOG.md**
3. **Ensure CI passes** (builds, linting)
4. **Request review** from maintainers
5. **Address feedback** promptly

## 📋 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Follow the existing component structure
- Use proper TypeScript props interfaces
- Keep components focused and reusable

### File Organization

- Place components in `src/components/`
- Use PascalCase for component files (`MyComponent.tsx`)
- Group related files in subdirectories
- Use barrel exports (`index.ts`) when appropriate

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Use CSS variables for theme colors
- Keep responsive design in mind

## 🧪 Testing Guidelines

While this template doesn't include tests by default, when adding tests:

- Use Jest and React Testing Library
- Test component behavior, not implementation
- Include integration tests for critical flows
- Maintain good test coverage

## 📚 Documentation

- Keep README.md up to date
- Add JSDoc comments for public APIs
- Include code examples in documentation
- Update CHANGELOG.md for all changes

## 🚀 Release Process

Releases are handled by maintainers:

1. **Version bump** following semantic versioning
2. **Update CHANGELOG.md** with release notes
3. **Create git tag** (`v1.0.0`)
4. **GitHub Actions** automatically builds and releases

## 🎯 What We're Looking For

### High Priority
- Bug fixes and stability improvements
- Performance optimizations
- Better TypeScript types
- Documentation improvements
- Accessibility enhancements

### Medium Priority
- New shadcn/ui component integrations
- Developer experience improvements
- Build process optimizations
- Cross-platform compatibility fixes

### Low Priority
- New features that significantly increase complexity
- Breaking changes (require major version bump)
- Platform-specific features

## ❓ Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Create an issue with the bug template
- **Feature requests**: Create an issue with the feature template
- **Security issues**: Email maintainers directly

## 📜 Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes**:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes**:
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, issues, and other contributions that are not aligned with this Code of Conduct.

## 🙏 Recognition

Contributors will be recognized in:
- CHANGELOG.md for their contributions
- GitHub contributors list
- Special mentions for significant contributions

Thank you for contributing to make this template better for everyone! 🚀
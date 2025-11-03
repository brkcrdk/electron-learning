# Electron + shadcn/ui Template

A modern Electron application template built with React, TypeScript, Vite, and shadcn/ui components. This template provides a solid foundation for building beautiful desktop applications with a complete UI component system and theme support.

## ✨ Features

- **⚡ Electron** - Cross-platform desktop app framework
- **⚛️ React 19** - Modern React with latest features
- **🔷 TypeScript** - Type-safe development
- **⚡ Vite** - Fast build tool and dev server
- **🎨 shadcn/ui** - Beautiful, accessible UI components
- **🎭 Tailwind CSS** - Utility-first CSS framework
- **🌙 Theme Support** - Light, dark, and system theme modes
- **🧭 React Router v7** - Client-side routing
- **📱 Responsive Design** - Mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone this template**
   ```bash
   git clone https://github.com/rohitsoni007/electron-shadcn.git my-electron-app
   cd my-electron-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   npm start
   ```

## 📦 Available Scripts

- `npm start` - Start the Electron app in development mode
- `npm run package` - Package the app for distribution
- `npm run make` - Create distributable packages
- `npm run publish` - Publish the app
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout component
│   ├── ThemeProvider.tsx # Theme context provider
│   └── ThemeToggle.tsx # Theme toggle button
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   └── Settings.tsx
├── App.tsx             # Main App component
├── main.ts             # Electron main process
├── router.tsx          # React Router configuration
└── index.css           # Global styles
```

## 🎨 UI Components

This template includes a complete set of shadcn/ui components:

- **Layout**: Button, Card, Dialog, Sheet, Tabs
- **Forms**: Input, Label, Select, Checkbox, Radio Group
- **Navigation**: Navigation Menu, Breadcrumb, Pagination
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Data Display**: Table, Avatar, Badge, Separator
- **Overlay**: Popover, Tooltip, Hover Card, Context Menu

## 🌙 Theme System

The template includes a complete theme system with:

- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes
- **System Mode** - Follows OS preference
- **Theme Toggle** - Easy switching between modes
- **Persistent Settings** - Theme preference saved to localStorage

### Using Themes

```tsx
import { useTheme } from "@/components/ThemeProvider";

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme("dark")}>
      Switch to Dark Mode
    </button>
  );
}
```

## 🧭 Routing

The template uses React Router v7 for navigation:

```tsx
// Add new routes in src/router.tsx
{
  path: "/my-page",
  element: <MyPage />,
}
```

## 🎯 Adding New Components

### Using shadcn/ui CLI

```bash
npx shadcn@latest add [component-name]
```

### Manual Component Creation

1. Create component in `src/components/`
2. Use TypeScript and follow the existing patterns
3. Import and use in your pages

## 🔧 Configuration

### Tailwind CSS

Customize your design system in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
      }
    }
  }
}
```

### Vite Configuration

Modify build settings in `vite.renderer.config.ts`:

```ts
export default defineConfig({
  // Your custom Vite config
});
```

## 📱 Building for Production

### Package the App

```bash
npm run package
```

### Create Distributables

```bash
npm run make
```

This will create platform-specific distributables in the `out/` directory.

## 🛠️ Development Tips

1. **Hot Reload** - The development server supports hot reload for fast iteration
2. **TypeScript** - Use TypeScript for better development experience
3. **Component Library** - Leverage the included shadcn/ui components
4. **Theme Consistency** - Use CSS variables for consistent theming
5. **Path Aliases** - Use `@/` imports for cleaner code organization

## 📚 Learn More

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn](https://github.com/shadcn) for the amazing UI components
- [Electron Forge](https://www.electronforge.io/) for the build tooling
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Happy coding! 🚀**

Built with ❤️ using Electron + shadcn/ui
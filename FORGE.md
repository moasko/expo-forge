# 🔥 Expo Forge

> Forge bulletproof Expo apps with modern architecture

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/yourusername/expo-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo](https://img.shields.io/badge/Expo-~50.0.0-black.svg)](https://expo.dev/)

**Expo Forge** is a professional code generator that creates modern, scalable Expo applications with bulletproof architecture. Built with TanStack Query, Zustand, and NativeWind for production-ready apps.

## ⚡ Quick Start

```bash
# Install globally (optional)
npm install -g expo-forge

# Initialize a new project
npx expo-forge init my-awesome-app

# Generate features
cd my-awesome-app
npx expo-forge generate feature booking
npx expo-forge generate feature payment
npx expo-forge generate feature reviews

# Start developing
npx expo start
```

## 🏗️ What You Get

### ✨ Modern Stack
- **Expo Router** - File-based routing
- **TanStack Query** - Powerful data fetching
- **Zustand** - Lightweight state management
- **NativeWind** - Tailwind CSS for React Native
- **Axios** - HTTP client with interceptors
- **TypeScript** - Full type safety

### 🏛️ Bulletproof Architecture
```
src/
├── api/           # Query clients & providers
├── app/           # File-based routing (Expo Router)
├── components/    # Reusable UI components
├── features/      # Feature-based architecture
│   ├── booking/   # Each feature is self-contained
│   ├── payment/   # ├── api/ (hooks)
│   └── reviews/   # ├── components/
├── hooks/         # Global custom hooks
├── store/         # Zustand stores
├── types/         # Global TypeScript types
├── utils/         # Helper functions
└── constants/     # App constants & config
```

### 🚀 Generated Features Include
- **API Layer** - TanStack Query hooks (CRUD operations)
- **State Management** - Zustand stores with persistence
- **UI Components** - NativeWind styled components
- **Type Safety** - Full TypeScript definitions
- **Error Handling** - Comprehensive error boundaries
- **Loading States** - Built-in loading & error states

## 📖 Usage

### Initialize Project
```bash
npx expo-forge init my-app
# Creates complete Expo project with all dependencies
```

### Generate Features
```bash
npx expo-forge generate feature user-management
npx expo-forge generate feature notifications
npx expo-forge generate feature analytics
```

### Custom Configuration
```javascript
// lib/config.js - Customize dependencies
const DEPENDENCIES = [
  'expo-router',
  '@tanstack/react-query',
  'zustand',
  // Add your packages here
];
```

## 🎯 Why Expo Forge?

| Feature | Expo Forge | Manual Setup |
|---------|------------|--------------|
| **Setup Time** | 2 minutes | 30+ minutes |
| **Architecture** | Bulletproof | Variable |
| **Type Safety** | 100% | Manual |
| **Best Practices** | Built-in | Experience required |
| **Scalability** | Enterprise-ready | Depends on dev |
| **Consistency** | Guaranteed | Team dependent |

## 🛠️ CLI Commands

```bash
# Initialize new project
expo-forge init <project-name>

# Generate feature
expo-forge generate feature <feature-name>

# Show help
expo-forge --help

# Show version
expo-forge --version
```

## 📚 Documentation

- **[Quick Start](DEMO.md)** - Get started in 5 minutes
- **[Architecture](ARCHITECTURE.md)** - Technical deep dive
- **[Contributing](CONTRIBUTING.md)** - Extend and contribute
- **[API Reference](README.md)** - Complete documentation

## 🔧 Customization

### Add Custom Dependencies
```javascript
// lib/config.js
const DEPENDENCIES = [
  // ... existing
  'your-custom-package',
];
```

### Create Custom Templates
```javascript
// lib/templates.js
featureTemplates.customFeature = (name) => `
  // Your custom template
`;
```

### Extend CLI Commands
```javascript
// Add to package.json scripts
"custom": "node custom-command.js"
```

## 🌟 Features

- ✅ **Modular Architecture** - Clean separation of concerns
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Production Ready** - Error handling, loading states
- ✅ **Extensible** - Easy to add new features
- ✅ **Modern Stack** - Latest Expo and React Native
- ✅ **Developer Experience** - Hot reload, debugging
- ✅ **Cross-Platform** - iOS, Android, Web support

## 📈 Roadmap

- [ ] React Native Web templates
- [ ] Authentication boilerplate
- [ ] Database integration (Prisma)
- [ ] Testing setup (Jest, Testing Library)
- [ ] CI/CD templates
- [ ] Storybook integration
- [ ] Performance monitoring

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with ❤️ using modern React Native tools and best practices.

---

**Forge your next Expo app with confidence!** 🚀
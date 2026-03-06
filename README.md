# 🔥 Expo Forge - Bulletproof Expo Architecture

[![Test & Lint](https://github.com/moasko/expo-forge/actions/workflows/test.yml/badge.svg)](https://github.com/moasko/expo-forge/actions/workflows/test.yml)
[![NPM Version](https://img.shields.io/npm/v/expo-forge.svg?style=flat-square)](https://www.npmjs.com/package/expo-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Forge modern Expo apps with battle-tested architecture.**  
Initialize complete projects and features with TanStack Query, Zustand, Axios, and NativeWind in seconds.

---

## ⚡ Quick Start

### 1. Install globally

```bash
npm install -g expo-forge
```

### 2. Forge a new project

```bash
expo-forge init my-epic-app
```

### 3. Generate powerful features

```bash
cd my-epic-app
expo-forge generate feature booking
```

---

## 🏛️ What's Inside the Forge?

When you initialize a project, Expo Forge sets up a **production-ready** environment:

- **🏗️ Bulletproof Structure** - Feature-based architecture (`src/features`, `src/api`, `src/hooks`).
- **🌐 Robust API Client** - Pre-configured **Axios** with interceptors and error handling.
- **🔄 Async State** - **TanStack Query (v5)** with optimized default configuration.
- **🧠 Local State** - **Zustand** stores for lightweight, predictable state management.
- **🎨 Premium Styling** - **NativeWind (Tailwind CSS)** configured with `global.css`.
- **📱 Mobile Navigation** - **Expo Router** (File-based) with Layouts and Type-safety.
- **🛡️ Safe Area Ready** - Integrated `SafeAreaProvider` for notched displays.
- **🎯 Environment Ready** - `.env.example` and TypeScript path aliases (`@/*`) set up.

---

## 🛠️ Feature Generation

The `generate feature` command creates a self-contained module:

```text
src/features/booking/
├── api/              # TanStack Query custom hooks
├── components/       # UI components (e.g., BookingCard.tsx)
├── hooks/            # Feature-specific business logic
├── services/         # Pure API calls via Axios
├── store/            # Zustand stores for this domain
├── types/            # TypeScript interfaces & DTOs
├── utils/            # Domain helpers
├── BookingScreen.tsx # Main feature entry screen
└── index.ts          # Clean public API for the feature
```

---

## 🏗️ Technical stack

- **Core**: [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React Native](https://lucide.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)

---

## 📖 Technical Guides

- **[🏗️ Deep Architecture](ARCHITECTURE.md)** - Understanding the "Forge" way.
- **[🎨 Branding](BRANDING.md)** - Visual identity of the CLI.
- **[🏁 Full Demo](DEMO.md)** - Step-by-step tutorial.
- **[🛣️ Roadmap](ROADMAP.md)** - Future of Expo Forge.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Forged with ❤️ by [moasko](https://github.com/moasko)** ⚒️✨

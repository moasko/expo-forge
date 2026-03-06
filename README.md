# 🔥 Expo Forge — Bulletproof Expo Architecture

[![Test & Lint](https://github.com/moasko/expo-forge/actions/workflows/test.yml/badge.svg)](https://github.com/moasko/expo-forge/actions/workflows/test.yml)
[![NPM Version](https://img.shields.io/npm/v/expo-forge.svg?style=flat-square)](https://www.npmjs.com/package/expo-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Forge modern Expo apps with battle-tested architecture.**  
Initialize complete projects and features with TanStack Query, Zustand, Axios, and NativeWind in seconds.

---

## ⚡ Quick Start

### Zero Install (Recommended)

No setup required. Just run and forge:

```bash
npx create-expo-forge-app my-awesome-app
```

That's it. ✅ Your fully configured Expo project is ready.

---

### Global CLI Install

```bash
# Install once
npm install -g expo-forge

# Forge a new project
expo-forge init my-epic-app

# Add features
cd my-epic-app
expo-forge generate feature booking
expo-forge generate feature payment
```

---

## 🛠️ CLI Commands

| Command                              | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| `npx create-expo-forge-app <name>`   | **Fastest** way to forge a new project          |
| `expo-forge init <name>`             | Initialize a new project (after global install) |
| `expo-forge generate feature <name>` | Scaffold a complete feature module              |
| `expo-forge --version`               | Show the current version                        |
| `expo-forge --help`                  | Show available commands                         |

---

## 🏛️ What's Inside the Forge?

When you initialize a project, Expo Forge sets up a **production-ready** environment:

- **🏗️ Bulletproof Structure** — Feature-based architecture (`src/features`, `src/api`, `src/hooks`).
- **🌐 Pre-configured Axios** — API client with interceptors, auth headers, and error handling.
- **🔄 TanStack Query v5** — Async state with caching, background refetch, and optimistic updates.
- **🧠 Zustand Stores** — Lightweight, predictable global state management.
- **🎨 NativeWind (Tailwind CSS)** — Utility-first styling with `global.css` pre-configured.
- **📱 Expo Router** — File-based navigation with layouts and type safety.
- **🛡️ Safe Area Ready** — `SafeAreaProvider` integrated for notched/modern devices.
- **🎯 Environment Ready** — `.env.example` & TypeScript path aliases (`@/*`) configured.

---

## 🏗️ Feature Generation

The `generate feature` command scaffolds a self-contained module:

```text
src/features/booking/
├── api/              # TanStack Query custom hooks (CRUD)
├── components/       # UI components (e.g. BookingCard.tsx)
├── hooks/            # Feature-specific business logic
├── services/         # Pure API calls via Axios
├── store/            # Zustand store for this domain
├── types/            # TypeScript interfaces & DTOs
├── utils/            # Domain-specific helpers
├── BookingScreen.tsx # Main entry screen for this feature
└── index.ts          # Clean public API
```

Import instantly:

```typescript
import { BookingScreen, useBookings } from "@/features/booking";
```

---

## 🔧 Technical Stack

| Layer                | Technology                                                           |
| -------------------- | -------------------------------------------------------------------- |
| **Runtime**          | [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/) |
| **Navigation**       | [Expo Router](https://docs.expo.dev/router/introduction/)            |
| **Data Fetching**    | [TanStack Query v5](https://tanstack.com/query)                      |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand)                         |
| **HTTP Client**      | [Axios](https://axios-http.com/)                                     |
| **Styling**          | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)             |
| **Language**         | TypeScript (strict)                                                  |

---

## 📖 Documentation

- **[⚡ Demo & Quickstart](DEMO.md)** — Step-by-step walkthrough.
- **[🏗️ Architecture Guide](ARCHITECTURE.md)** — Under-the-hood deep dive.
- **[🛠️ Contribution Guide](CONTRIBUTING.md)** — Extend and customize the Forge.
- **[🛣️ Roadmap](ROADMAP.md)** — The future of Expo Forge.
- **[📦 Publish Guide](PUBLISH.md)** — NPM publication workflow.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License — see the [LICENSE](LICENSE) file for details.

---

**Forged with ❤️ by [moasko](https://github.com/moasko)** ⚒️✨

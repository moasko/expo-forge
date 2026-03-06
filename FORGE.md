# 🔥 EXPO FORGE 🔥

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ███████╗██╗  ██╗██████╗  ██████╗     ███████╗ ██████╗ ██████╗  ██████╗ ███████╗
║   ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
║   █████╗   ╚███╔╝ ██████╔╝██║   ██║    █████╗  ██║   ██║██████╔╝██║  ███╗█████╗
║   ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║    ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝
║   ███████╗██╔╝ ██╗██║     ╚██████╔╝    ██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
║   ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝     ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
║                                                              ║
║              🔥 BULLETPROOF EXPO ARCHITECTURE 🔥              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## 🏗️ Forge Modern Expo Apps

**Expo Forge** is your ultimate toolkit for crafting production-ready Expo applications with enterprise-grade architecture.

### ⚡ What Makes It Special?

- **🔥 Bulletproof Architecture** — Feature-based, scalable, and maintainable.
- **⚡ Zero-Install Launch** — No global setup required. Just `npx` and go.
- **🎯 Production Ready** — Error handling, loading states, full TypeScript.
- **🛠️ Great DX** — Hot reload, debugging, and modern tooling out of the box.
- **📱 Cross-Platform** — iOS, Android, Web from a single codebase.

---

### 🚀 Start Forging — Zero Install Required

```bash
# ✅ No install needed — just run it!
npx create-expo-forge-app my-epic-app
```

That's it. Your fully configured project is ready in seconds.

---

### Or Use the Full CLI

```bash
# Install once
npm install -g expo-forge

# Forge a project
expo-forge init my-epic-app

# Add powerful features
cd my-epic-app
npx expo-forge generate feature auth
npx expo-forge generate feature dashboard
npx expo-forge generate feature payments

# Start developing
npx expo start
```

---

### 🏛️ Architecture Overview

```
🔥 EXPO FORGE STRUCTURE
├── 🎯 app/           # File-based routing (Expo Router)
├── 🏗️ features/      # Self-contained business logic
│   ├── auth/         # ├── api/ (TanStack Query)
│   ├── dashboard/    # ├── components/ (UI)
│   └── payments/     # ├── store/ (Zustand)
├── 🛠️ lib/           # Shared utilities (api-client, etc.)
├── 🎨 components/    # Reusable UI components
└── ⚙️ constants/     # App config & environment
```

---

### 🔥 Tech Stack

| Category    | Technology        | Why?                                   |
| ----------- | ----------------- | -------------------------------------- |
| **Routing** | Expo Router       | File-based, type-safe navigation       |
| **Data**    | TanStack Query v5 | Powerful caching & background updates  |
| **State**   | Zustand           | Lightweight, scalable state management |
| **Styling** | NativeWind        | Tailwind CSS for React Native          |
| **HTTP**    | Axios             | Robust client with interceptors        |
| **Types**   | TypeScript        | Full type safety and better DX         |

---

### 🎯 Feature Highlights

- ✅ **Zero Config** — Works out of the box
- ✅ **Type Safe** — Full TypeScript coverage
- ✅ **Modern Stack** — Latest Expo and React Native
- ✅ **Scalable** — Feature-based architecture
- ✅ **Testable** — Modular design
- ✅ **Extensible** — Add custom templates and features

---

### 🛠️ CLI Commands

```bash
# ⭐ Zero-install (recommended)
npx create-expo-forge-app <name>

# Full CLI (after global install)
expo-forge init <name>
expo-forge generate feature <name>
expo-forge --version
expo-forge --help
```

---

### 🌟 Why Choose Expo Forge?

| Aspect             | Expo Forge       | Manual Setup        |
| ------------------ | ---------------- | ------------------- |
| **Time to Start**  | `npx` — instant  | 30+ min             |
| **Architecture**   | Enterprise-grade | Developer dependent |
| **Best Practices** | Built-in         | Manual              |
| **Scalability**    | Guaranteed       | Depends on dev      |
| **Type Safety**    | 100%             | Partial             |
| **Error Handling** | Comprehensive    | Basic               |

---

### 📚 Documentation

- **[🏁 Quick Start](DEMO.md)** — Get forging in 5 minutes
- **[🏗️ Architecture](ARCHITECTURE.md)** — Deep technical dive
- **[🛠️ Contributing](CONTRIBUTING.md)** — Extend and customize
- **[📖 API Docs](README.md)** — Complete reference
- **[📦 Publishing](PUBLISH.md)** — NPM publication guide

---

### 🤝 Community

Join developers forging the future of Expo apps!

- **GitHub**: [moasko/expo-forge](https://github.com/moasko/expo-forge)
- **Issues**: Report bugs and request features
- **Discussions**: Share ideas and get help

---

### 📈 Roadmap

- [ ] **Auth Boilerplate** — Complete authentication flow
- [ ] **Database Integration** — Prisma + SQLite/PostgreSQL
- [ ] **Testing Suite** — Jest + Testing Library setup
- [ ] **Storybook** — Component development environment
- [ ] **CI/CD Templates** — GitHub Actions, EAS
- [ ] **Performance Monitoring** — Sentry integration

---

## 🔥 Ready to Forge?

```bash
npx create-expo-forge-app my-forge-app
```

**Forge your next Expo masterpiece!** ⚒️✨

---

_Built with ❤️ by [moasko](https://github.com/moasko) for the Expo community_

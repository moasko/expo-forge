# Expo Forge - Bulletproof Expo Architecture

Forge modern Expo apps with bulletproof architecture. Generate complete projects and features with TanStack Query, Zustand, and NativeWind.

## Installation

```bash
npm install -g expo-forge
```

## Usage

### Initialize a new Expo project

```bash
expo-forge init my-app
```

This creates:
- ✅ New Expo project with create-expo-app
- ✅ Modern dependencies installation
- ✅ Bulletproof structure (src/api, src/features, etc.)
- ✅ TanStack Query & Zustand configuration
- ✅ Tailwind CSS with NativeWind setup

### Generate a new feature

```bash
expo-forge generate feature booking
```

This creates a complete structure:
```
src/features/booking/
├── api/              # TanStack Query hooks
├── components/       # UI components
├── hooks/            # Business logic
├── services/         # API calls
├── store/            # Zustand stores
├── types/            # TypeScript types
├── utils/            # Helpers
├── BookingScreen.tsx # Main screen
└── index.ts          # Exports
```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - React Native platform
- **TanStack Query** - Async state management
- **Zustand** - Local state management
- **Axios** - HTTP client
- **NativeWind** - Tailwind CSS for React Native
- **Lucide** - Icons

## Links

- [GitHub Repository](https://github.com/moasko/expo-forge)
- [Documentation](https://github.com/moasko/expo-forge#readme)
- [Issues](https://github.com/moasko/expo-forge/issues)

## License

MIT - see LICENSE file for details.

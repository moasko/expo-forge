/**
 * Config - Configuration centralisée du projet
 */

const DEPENDENCIES = [
  'expo-router',
  'expo-constants',
  'expo-linking',
  'expo-status-bar',
  'react-native-safe-area-context',
  'react-native-screens',
  '@tanstack/react-query',
  'zustand',
  'axios',
  'lucide-react-native',
  'nativewind',
  'tailwindcss',
  'typescript',
  '@types/react',
  '@types/react-native',
];

const FOLDER_STRUCTURE = [
  'src/api',           // Clients API & Query Providers
  'src/app',           // Routes (Expo Router)
  'src/components/ui', // Composants atomiques réutilisables
  'src/features',      // Logique par domaine
  'src/hooks',         // Hooks globaux
  'src/store',         // Zustand stores
  'src/types',         // Interfaces TS globales
  'src/utils',         // Fonctions helpers
  'src/constants',     // Theme, API URLs
  'src/lib',           // Utilitaires (API client, etc.)
];

const FEATURE_STRUCTURE = [
  'api',        // Hooks TanStack Query
  'components', // Composants UI
  'hooks',      // Logique métier
  'services',   // Appels API pure
  'store',      // Zustand stores
  'types',      // TypeScript types
  'utils',      // Helpers et utilitaires
];

module.exports = {
  DEPENDENCIES,
  FOLDER_STRUCTURE,
  FEATURE_STRUCTURE,
};

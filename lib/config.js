const fs = require('fs');
const path = require('path');

let FOLDER_STRUCTURE = [
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

let FEATURE_STRUCTURE = [
  'api',        // Hooks TanStack Query
  'components', // Composants UI
  'hooks',      // Logique métier
  'services',   // Appels API pure
  'store',      // Zustand stores
  'types',      // TypeScript types
  'utils',      // Helpers et utilitaires
];

let DEPENDENCIES = [
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

// Tentative de chargement d'une configuration locale (Custom Templates/Config)
const localConfigPath = path.join(process.cwd(), 'forge.config.js');
if (fs.existsSync(localConfigPath)) {
  try {
    const localConfig = require(localConfigPath);
    if (localConfig.folderStructure) FOLDER_STRUCTURE = localConfig.folderStructure;
    if (localConfig.featureStructure) FEATURE_STRUCTURE = localConfig.featureStructure;
    if (localConfig.dependencies) DEPENDENCIES = localConfig.dependencies;
  } catch (e) {
    // Silently ignore or log warning if needed
  }
}

module.exports = {
  DEPENDENCIES,
  FOLDER_STRUCTURE,
  FEATURE_STRUCTURE,
};

const fs = require('fs');
const path = require('path');

let FOLDER_STRUCTURE = [
  'src/api',
  'src/app',
  'src/components/ui',
  'src/features',
  'src/hooks',
  'src/config',
  'src/providers',
  'src/store',
  'src/types',
  'src/utils',
  'src/constants',
  'src/theme',
  'src/lib',
];

let FEATURE_STRUCTURE = [
  'api',
  'components',
  'hooks',
  'services',
  'store',
  'types',
  'utils',
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
  'typescript',
  '@types/react',
  '@types/react-native',
];

const localConfigPath = path.join(process.cwd(), 'forge.config.js');
if (fs.existsSync(localConfigPath)) {
  try {
    const localConfig = require(localConfigPath);
    if (localConfig.folderStructure) FOLDER_STRUCTURE = localConfig.folderStructure;
    if (localConfig.featureStructure) FEATURE_STRUCTURE = localConfig.featureStructure;
    if (localConfig.dependencies) DEPENDENCIES = localConfig.dependencies;
  } catch (error) {
    // Ignore invalid local config so the CLI can continue with defaults.
  }
}

module.exports = {
  DEPENDENCIES,
  FOLDER_STRUCTURE,
  FEATURE_STRUCTURE,
};

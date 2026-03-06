/**
 * InitExpo - Logique d'initialisation du projet Expo
 */

const path = require('path');
const { executeCommand, changeDirectory } = require('./executor');
const { createDirectories, writeFiles } = require('./fileWriter');
const { initTemplates } = require('./templates');
const { DEPENDENCIES, FOLDER_STRUCTURE } = require('./config');
const logger = require('./logger');

const initializeProject = (projectName = 'my-modern-app') => {
  const projectPath = path.join(process.cwd(), projectName);

  logger.rocket(`Initialisation d'un projet Expo Ultra-Moderne: ${projectName}`);

  try {
    // 1. Créer le projet avec Expo
    logger.section('ÉTAPE 1: Création du projet');
    executeCommand(`npx create-expo-app@latest ${projectName} --template blank-typescript`);

    // 2. Changer le répertoire
    changeDirectory(projectPath);

    // 3. Installer les dépendances
    logger.section('ÉTAPE 2: Installation des dépendances');
    logger.package('Installation des frameworks modernes...');
    executeCommand(`npx expo install ${DEPENDENCIES.join(' ')}`);

    // 4. Créer la structure de dossiers
    logger.section('ÉTAPE 3: Création de l\'arborescence');
    createDirectories(projectPath, FOLDER_STRUCTURE);
    logger.success('Structure de dossiers créée');

    // 5. Générer les fichiers de configuration
    logger.section('ÉTAPE 4: Génération des fichiers');
    const files = {
      'src/api/query-client.ts': initTemplates.queryClient(),
      'src/lib/api-client.ts': initTemplates.apiClient(),
      'src/store/useAuthStore.ts': initTemplates.authStore(),
      'src/app/_layout.tsx': initTemplates.rootLayout(),
      'src/app/index.tsx': initTemplates.homeScreen(),
      'global.css': initTemplates.globalCSS(),
      'tailwind.config.js': initTemplates.tailwindConfig(),
      'tsconfig.json': initTemplates.tsconfig(),
      '.env.example': initTemplates.envExample(),
    };

    writeFiles(projectPath, files);

    // 6. Afficher le message de succès
    logger.section('✅ SUCCÈS');
    logger.sparkle('Projet initialisé avec succès!');
    console.log(`
Pour démarrer:
  1. cd ${projectName}
  2. npx expo start

Structure:
  📁 src/features  - Pour tes modules métiers
  📁 src/app       - Pour tes pages (navigation auto)
  🚀 TanStack Query & Zustand configurés
  🎨 NativeWind & Tailwind CSS prêts
    `);
  } catch (error) {
    logger.error(`Initialisation échouée: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { initializeProject };

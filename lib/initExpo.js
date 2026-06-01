const path = require('path');
const fs = require('fs');
const { executeCommand, changeDirectory } = require('./executor');
const { createDirectories, writeFiles } = require('./fileWriter');
const { initTemplates } = require('./templates');
const { DEPENDENCIES, FOLDER_STRUCTURE } = require('./config');
const { validateProjectName } = require('./validators');
const logger = require('./logger');

const updateGeneratedPackageJson = (projectPath) => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.main = 'expo-router/entry';
  packageJson.scripts = {
    ...packageJson.scripts,
    typecheck: 'tsc --noEmit',
  };

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
};

const initializeProject = (projectName = 'my-modern-app') => {
  const safeProjectName = validateProjectName(projectName);
  const projectPath = path.join(process.cwd(), safeProjectName);

  logger.rocket(`Initializing Expo Forge project: ${safeProjectName}`);

  try {
    logger.section('Step 1: Create Expo project');
    executeCommand('npx', [
      'create-expo-app@latest',
      safeProjectName,
      '--template',
      'blank-typescript',
    ]);

    changeDirectory(projectPath);

    logger.section('Step 2: Install dependencies');
    logger.package('Installing Expo Forge stack...');
    executeCommand('npx', ['expo', 'install', ...DEPENDENCIES]);

    logger.section('Step 3: Create folder structure');
    createDirectories(projectPath, FOLDER_STRUCTURE);
    logger.success('Folder structure created');

    logger.section('Step 4: Generate project files');
    const files = {
      'app.config.ts': initTemplates.appConfig(safeProjectName),
      'src/api/query-client.ts': initTemplates.queryClient(),
      'src/components/ui/empty-state.tsx': initTemplates.emptyState(),
      'src/components/ui/loading-state.tsx': initTemplates.loadingState(),
      'src/components/ui/screen.tsx': initTemplates.screen(),
      'src/config/env.ts': initTemplates.envConfig(),
      'src/lib/api-client.ts': initTemplates.apiClient(),
      'src/lib/api-error.ts': initTemplates.apiError(),
      'src/providers/app-provider.tsx': initTemplates.appProvider(),
      'src/store/use-session-store.ts': initTemplates.sessionStore(),
      'src/theme/tokens.ts': initTemplates.themeTokens(),
      'src/app/_layout.tsx': initTemplates.rootLayout(),
      'src/app/index.tsx': initTemplates.homeScreen(),
      'tsconfig.json': initTemplates.tsconfig(),
      '.env.example': initTemplates.envExample(),
    };

    writeFiles(projectPath, files);
    updateGeneratedPackageJson(projectPath);

    logger.section('Success');
    logger.sparkle('Project initialized successfully.');
    console.log(`
Next steps:
  1. cd ${safeProjectName}
  2. npx expo start

Generated structure:
  src/features  Feature modules
  src/app       Expo Router screens
  src/api       TanStack Query setup
  src/store     Zustand stores
  src/lib       Shared clients and utilities
`);
  } catch (error) {
    logger.error(`Initialization failed: ${error.message}`);
    throw error;
  }
};

module.exports = { initializeProject };

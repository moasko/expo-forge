#!/usr/bin/env node

const { initializeProject } = require('../lib/initExpo');
const logger = require('../lib/logger');

const projectName = process.argv[2];

if (!projectName || projectName.startsWith('-')) {
  console.log('');
  console.log('  Expo Forge - Bulletproof Expo architecture');
  console.log('');
  console.log('  Usage:   npx create-expo-forge-app <project-name>');
  console.log('  Example: npx create-expo-forge-app my-awesome-app');
  console.log('');
  process.exit(1);
}

try {
  initializeProject(projectName);
  console.log('');
  logger.success(`"${projectName}" is ready to launch.`);
  console.log('');
  logger.info('Next steps:');
  logger.info(`  cd ${projectName}`);
  logger.info('  npx expo start');
  console.log('');
} catch (error) {
  logger.error(`Failed to initialize project: ${error.message}`);
  process.exit(1);
}

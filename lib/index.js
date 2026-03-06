#!/usr/bin/env node

/**
 * Expo Forge - Main Entry Point
 * Forge modern Expo apps with bulletproof architecture
 */

const { initializeProject } = require('./initExpo');
const { generateModernFeature } = require('./featureGenerator');
const logger = require('./logger');

const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];
const name = args[2];

console.log(`
🔥 EXPO FORGE 🔥
Forge modern Expo apps with bulletproof architecture
`);

if (!command) {
  showHelp();
  process.exit(0);
}

switch (command) {
  case 'init':
    const projectName = name || 'my-expo-app';
    logger.info(`Initializing new Expo project: ${projectName}`);
    initializeProject(projectName);
    break;

  case 'generate':
    if (subCommand === 'feature' && name) {
      logger.info(`Generating feature: ${name}`);
      generateModernFeature(name);
    } else {
      logger.error('Usage: expo-forge generate feature <name>');
      process.exit(1);
    }
    break;

  case '--help':
  case '-h':
    showHelp();
    break;

  case '--version':
  case '-v':
    showVersion();
    break;

  default:
    logger.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}

function showHelp() {
  console.log(`
Usage:
  expo-forge init [project-name]     Initialize a new Expo project
  expo-forge generate feature <name> Generate a new feature

Examples:
  expo-forge init my-awesome-app
  expo-forge generate feature booking
  expo-forge generate feature payment

Options:
  -h, --help     Show this help message
  -v, --version  Show version information

For more information, visit: https://github.com/moasko/expo-forge
`);
}

function showVersion() {
  const package = require('../package.json');
  console.log(`${package.version}`);
}
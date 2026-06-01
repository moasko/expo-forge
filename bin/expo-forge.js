#!/usr/bin/env node

const { program } = require('commander');
const { initializeProject } = require('../lib/initExpo');
const { generateFeature } = require('../lib/featureGenerator');
const logger = require('../lib/logger');
const pkg = require('../package.json');

program
  .name('expo-forge')
  .description('Forge modern Expo apps with bulletproof architecture')
  .version(pkg.version);

program
  .command('init <projectName>')
  .description('Initialize a new Expo project with the Expo Forge architecture')
  .action((projectName) => {
    try {
      initializeProject(projectName);
    } catch (error) {
      logger.error(error.message);
      process.exit(1);
    }
  });

program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate a new feature')
  .action((type, name) => {
    try {
      if (type !== 'feature') {
        throw new Error('Only "feature" generation is currently supported.');
      }

      generateFeature(name);
    } catch (error) {
      logger.error(error.message);
      process.exit(1);
    }
  });

program
  .command('doctor')
  .description('Check the local Node.js and npm environment')
  .action(() => {
    logger.section('Expo Forge doctor');
    logger.success(`Node.js ${process.version}`);
    logger.info('Run "npm --version" and "npx expo --version" if project creation fails.');
  });

program.addHelpText(
  'after',
  `
Examples:
  $ expo-forge init my-app
  $ expo-forge generate feature booking
  $ npx create-expo-forge-app my-app

Project and feature names must be lowercase kebab-case, for example "my-app".
`,
);

program.parse();

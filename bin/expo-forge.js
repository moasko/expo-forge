#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");

// Import our modules
const initExpo = require("../lib/initExpo");
const featureGenerator = require("../lib/featureGenerator");
const logger = require("../lib/logger");

const pkg = require("../package.json");

program
  .name("expo-forge")
  .description("Forge modern Expo apps with bulletproof architecture")
  .version(pkg.version);

program
  .command("init [projectName]")
  .description("Initialize a new Expo project with bulletproof architecture")
  .action(async (projectName) => {
    try {
      if (!projectName) {
        logger.error(
          "Please provide a project name: expo-forge init <projectName>",
        );
        process.exit(1);
      }

      logger.rocket(`Initializing Expo Forge project: ${projectName}`);
      await initExpo.initializeProject(projectName);
      logger.success(`Project ${projectName} created successfully!`);
      logger.info(`Run: cd ${projectName} && npx expo start`);
    } catch (error) {
      logger.error(`Failed to initialize project: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("generate <type> <name>")
  .description("Generate a new feature or component")
  .action(async (type, name) => {
    try {
      if (type !== "feature") {
        logger.error('Currently only "feature" type is supported');
        process.exit(1);
      }

      logger.build(`Generating ${type}: ${name}`);
      await featureGenerator.generateFeature(name);
      logger.success(`${type} ${name} generated successfully!`);
    } catch (error) {
      logger.error(`Failed to generate ${type}: ${error.message}`);
      process.exit(1);
    }
  });

// Add help examples
program.addHelpText(
  "after",
  `
Examples:
  $ expo-forge init my-app
  $ expo-forge generate feature booking
  $ npx create-expo-forge-app my-app

For more information, visit: https://github.com/moasko/expo-forge
`,
);

// Parse command line arguments
program.parse();

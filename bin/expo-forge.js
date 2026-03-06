#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");

// Import our modules
const initExpo = require("../lib/initExpo");
const featureGenerator = require("../lib/featureGenerator");
const logger = require("../lib/logger");

const pkg = require("../package.json");

// ─── create-expo-forge-app mode ─────────────────────────────────────────────
// When invoked as `npx create-expo-forge-app <appName>`, the first argument
// is the project name directly — no subcommand needed.
// Detect this by checking the binary name used to invoke this script.
const invokedAs = path.basename(process.argv[1]); // e.g. "create-expo-forge-app"
const isCreateMode = invokedAs === "create-expo-forge-app";

if (isCreateMode) {
  const projectName = process.argv[2];

  if (!projectName || projectName.startsWith("-")) {
    console.error("\n  ✦ Usage: npx create-expo-forge-app <project-name>\n");
    console.error("  Example: npx create-expo-forge-app my-awesome-app\n");
    process.exit(1);
  }

  (async () => {
    try {
      logger.rocket(`Forging your new Expo project: ${projectName}...`);
      await initExpo.initializeProject(projectName);
      logger.success(`\n✅ Project "${projectName}" is ready to forge!\n`);
      logger.info(`Next steps:`);
      logger.info(`  1. cd ${projectName}`);
      logger.info(`  2. npx expo start`);
    } catch (error) {
      logger.error(`Failed to initialize project: ${error.message}`);
      process.exit(1);
    }
  })();

  return; // stop here — no need for the full CLI parser
}

// ─── Full CLI mode (expo-forge) ──────────────────────────────────────────────
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

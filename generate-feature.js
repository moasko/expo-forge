#!/usr/bin/env node

const { generateFeature } = require('./lib/featureGenerator');
const logger = require('./lib/logger');

const [command, type, name] = process.argv.slice(2);

try {
  if (command !== 'generate' || type !== 'feature') {
    throw new Error('Usage: node generate-feature.js generate feature <name>');
  }

  generateFeature(name);
} catch (error) {
  logger.error(error.message);
  process.exit(1);
}

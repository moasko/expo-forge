#!/usr/bin/env node

const { generateModernFeature } = require('./lib/featureGenerator');

const args = process.argv.slice(2);
const [command, type, name] = args;

if (command === 'generate' && type === 'feature') {
  generateModernFeature(name);
} else {
  console.log('Usage: node generate-feature.js generate feature <name>');
  console.log('Example: node generate-feature.js generate feature booking');
}
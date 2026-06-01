#!/usr/bin/env node

const { initializeProject } = require('./lib/initExpo');
const logger = require('./lib/logger');

const projectName = process.argv[2] || 'my-modern-app';

try {
  initializeProject(projectName);
} catch (error) {
  logger.error(error.message);
  process.exit(1);
}

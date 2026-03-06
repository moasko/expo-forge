#!/usr/bin/env node

const { initializeProject } = require('./lib/initExpo');

const projectName = process.argv[2] || 'my-modern-app';

initializeProject(projectName);
#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const npmExecPath = process.env.npm_execpath;

const run = (label, fn) => {
  try {
    fn();
    console.log(`[OK] ${label}`);
  } catch (error) {
    console.error(`[FAIL] ${label}`);
    console.error(error.message);
    process.exit(1);
  }
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('Testing Expo Forge CLI...\n');

run('CLI prints the package version', () => {
  const pkg = readJson(path.join(rootDir, 'package.json'));
  const output = execFileSync('node', ['bin/expo-forge.js', '--version'], {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim();

  if (output !== pkg.version) {
    throw new Error(`Expected version ${pkg.version}, received ${output}`);
  }
});

run('Help command includes the main commands', () => {
  const output = execFileSync('node', ['bin/expo-forge.js', '--help'], {
    cwd: rootDir,
    encoding: 'utf8',
  });

  for (const expected of ['init', 'generate', 'doctor']) {
    if (!output.includes(expected)) {
      throw new Error(`Help output is missing "${expected}"`);
    }
  }
});

run('package.json exposes the expected binaries', () => {
  const pkg = readJson(path.join(rootDir, 'package.json'));
  const requiredFields = ['name', 'version', 'description', 'bin', 'main'];

  for (const field of requiredFields) {
    if (!pkg[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (pkg.bin['expo-forge'] !== 'bin/expo-forge.js') {
    throw new Error('expo-forge binary points to the wrong file');
  }

  if (pkg.bin['create-expo-forge-app'] !== 'bin/create-expo-forge-app.js') {
    throw new Error('create-expo-forge-app binary points to the wrong file');
  }
});

run('Public exports are available', () => {
  const api = require('./lib');

  for (const exportName of ['initializeProject', 'generateFeature', 'generateModernFeature', 'validators']) {
    if (!api[exportName]) {
      throw new Error(`Missing export: ${exportName}`);
    }
  }
});

run('Name validation rejects unsafe names', () => {
  const { validators } = require('./lib');
  const invalidNames = ['../bad', 'BadName', 'bad name', 'bad--name', '-bad', 'bad-'];

  for (const name of invalidNames) {
    let failed = false;
    try {
      validators.validateFeatureName(name);
    } catch (error) {
      failed = true;
    }

    if (!failed) {
      throw new Error(`Expected "${name}" to be rejected`);
    }
  }
});

run('Feature generation writes the expected files', () => {
  const testDir = path.join(rootDir, '.test-output');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });

  const originalCwd = process.cwd();
  process.chdir(testDir);

  try {
    const { generateFeature } = require('./lib/featureGenerator');
    generateFeature('user-profile');
  } finally {
    process.chdir(originalCwd);
  }

  const featureDir = path.join(testDir, 'src', 'features', 'user-profile');
  const expectedFiles = [
    'types/index.ts',
    'services/user-profile.service.ts',
    'api/use-user-profile.ts',
    'store/use-user-profile-store.ts',
    'components/user-profile-card.tsx',
    'user-profile-screen.tsx',
    'index.ts',
  ];

  for (const file of expectedFiles) {
    if (!fs.existsSync(path.join(featureDir, file))) {
      throw new Error(`Missing generated file: ${file}`);
    }
  }

  fs.rmSync(testDir, { recursive: true, force: true });
});

run('npm pack dry-run contains the publishable files', () => {
  const command = npmExecPath ? process.execPath : process.platform === 'win32' ? 'npm' : 'npm';
  const args = npmExecPath
    ? [npmExecPath, 'pack', '--dry-run', '--json', '--cache', '.npm-cache']
    : ['pack', '--dry-run', '--json', '--cache', '.npm-cache'];

  const output = execFileSync(command, args, {
    cwd: rootDir,
    encoding: 'utf8',
  });
  const [pack] = JSON.parse(output);
  const files = pack.files.map((file) => file.path);

  for (const expected of [
    'bin/expo-forge.js',
    'bin/create-expo-forge-app.js',
    'lib/validators.js',
    'lib/index.js',
    'package.json',
  ]) {
    if (!files.includes(expected)) {
      throw new Error(`Packed files are missing ${expected}`);
    }
  }
});

console.log('\nAll tests passed. Expo Forge is ready for publication.');

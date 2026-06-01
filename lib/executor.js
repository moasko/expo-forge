const { execFileSync, execSync } = require('child_process');
const logger = require('./logger');

const resolveCommand = (command) => {
  if (process.platform === 'win32' && ['npm', 'npx'].includes(command)) {
    return `${command}.cmd`;
  }

  return command;
};

const executeCommand = (command, args = [], options = {}) => {
  const defaultOptions = {
    stdio: 'inherit',
    ...options,
  };

  try {
    execFileSync(resolveCommand(command), args, defaultOptions);
    return true;
  } catch (error) {
    logger.error(`Command failed: ${command} ${args.join(' ')}`);
    throw error;
  }
};

const executeCommandSilent = (command) => {
  try {
    const result = execSync(command, { encoding: 'utf-8' });
    return result.trim();
  } catch (error) {
    throw error;
  }
};

const changeDirectory = (dirPath) => {
  try {
    process.chdir(dirPath);
    return true;
  } catch (error) {
    logger.error(`Cannot change directory: ${dirPath}`);
    throw error;
  }
};

const getCurrentDirectory = () => process.cwd();

module.exports = {
  executeCommand,
  executeCommandSilent,
  changeDirectory,
  getCurrentDirectory,
};

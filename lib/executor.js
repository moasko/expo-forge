/**
 * Executor - Gestion de l'exécution des commandes système
 */

const { execSync } = require('child_process');
const logger = require('./logger');

/**
 * Exécute une commande avec affichage en direct
 */
const executeCommand = (command, options = {}) => {
  const defaultOptions = {
    stdio: 'inherit',
    shell: true,
    ...options,
  };

  try {
    execSync(command, defaultOptions);
    return true;
  } catch (error) {
    logger.error(`Erreur lors de l'exécution: ${command}`);
    throw error;
  }
};

/**
 * Exécute une commande silencieusement (récupère le résultat)
 */
const executeCommandSilent = (command) => {
  try {
    const result = execSync(command, { encoding: 'utf-8' });
    return result.trim();
  } catch (error) {
    throw error;
  }
};

/**
 * Change le répertoire courant
 */
const changeDirectory = (dirPath) => {
  try {
    process.chdir(dirPath);
    return true;
  } catch (error) {
    logger.error(`Impossible de changer de répertoire: ${dirPath}`);
    throw error;
  }
};

/**
 * Obtient le répertoire courant
 */
const getCurrentDirectory = () => process.cwd();

module.exports = {
  executeCommand,
  executeCommandSilent,
  changeDirectory,
  getCurrentDirectory,
};

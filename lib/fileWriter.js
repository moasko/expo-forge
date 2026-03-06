/**
 * FileWriter - Gestion de la création de fichiers et répertoires
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * Crée les répertoires s'ils n'existent pas
 */
const createDirectories = (baseDir, folders) => {
  folders.forEach((dir) => {
    const fullPath = path.join(baseDir, dir);
    try {
      fs.mkdirSync(fullPath, { recursive: true });
    } catch (error) {
      logger.error(`Impossible de créer le dossier: ${dir}`);
      throw error;
    }
  });
};

/**
 * Écrit un ensemble de fichiers
 */
const writeFiles = (baseDir, filesObject) => {
  Object.entries(filesObject).forEach(([filePath, content]) => {
    const fullPath = path.join(baseDir, filePath);
    const dir = path.dirname(fullPath);

    // Créer le répertoire parent s'il n'existe pas
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      fs.writeFileSync(fullPath, content, 'utf-8');
      logger.success(`${filePath}`);
    } catch (error) {
      logger.error(`Impossible d'écrire le fichier: ${filePath}`);
      throw error;
    }
  });
};

/**
 * Écrit un fichier unique
 */
const writeFile = (filePath, content) => {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    logger.error(`Impossible d'écrire le fichier: ${filePath}`);
    throw error;
  }
};

/**
 * Vérifie si un répertoire existe
 */
const directoryExists = (dirPath) => fs.existsSync(dirPath);

/**
 * Lit le contenu d'un fichier
 */
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    logger.error(`Impossible de lire le fichier: ${filePath}`);
    throw error;
  }
};

module.exports = {
  createDirectories,
  writeFiles,
  writeFile,
  directoryExists,
  readFile,
};

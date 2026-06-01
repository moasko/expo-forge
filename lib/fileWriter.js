const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const createDirectories = (baseDir, folders) => {
  folders.forEach((dir) => {
    const fullPath = path.join(baseDir, dir);
    try {
      fs.mkdirSync(fullPath, { recursive: true });
    } catch (error) {
      logger.error(`Cannot create folder: ${dir}`);
      throw error;
    }
  });
};

const writeFiles = (baseDir, filesObject) => {
  Object.entries(filesObject).forEach(([filePath, content]) => {
    const fullPath = path.join(baseDir, filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      fs.writeFileSync(fullPath, content, 'utf-8');
      logger.success(filePath);
    } catch (error) {
      logger.error(`Cannot write file: ${filePath}`);
      throw error;
    }
  });
};

const writeFile = (filePath, content) => {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    logger.error(`Cannot write file: ${filePath}`);
    throw error;
  }
};

const directoryExists = (dirPath) => fs.existsSync(dirPath);

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    logger.error(`Cannot read file: ${filePath}`);
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

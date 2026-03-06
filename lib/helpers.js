/**
 * Helpers - Fonctions utilitaires générales
 */

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const pascalCase = (str) => capitalize(str.toLowerCase());

const camelCase = (str) => {
  const pascal = pascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const snakeCase = (str) => str.toLowerCase().replace(/\s/g, '_');

const kebabCase = (str) => str.toLowerCase().replace(/\s/g, '-');

const formatPath = (basePath, subPath) => {
  const path = require('path');
  return path.join(basePath, subPath);
};

module.exports = {
  capitalize,
  pascalCase,
  camelCase,
  snakeCase,
  kebabCase,
  formatPath,
};

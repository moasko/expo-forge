const words = (str) => String(str).split(/[^a-zA-Z0-9]+/).filter(Boolean);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const pascalCase = (str) =>
  words(str)
    .map((word) => capitalize(word.toLowerCase()))
    .join('');

const camelCase = (str) => {
  const pascal = pascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const snakeCase = (str) => words(str).map((word) => word.toLowerCase()).join('_');

const kebabCase = (str) => words(str).map((word) => word.toLowerCase()).join('-');

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

const VALID_NAME_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

const validatePackageName = (name, label = 'name') => {
  if (!name || typeof name !== 'string') {
    throw new Error(`${label} is required.`);
  }

  if (name.length > 214) {
    throw new Error(`${label} must be 214 characters or fewer.`);
  }

  if (!VALID_NAME_PATTERN.test(name)) {
    throw new Error(
      `${label} must use lowercase letters, numbers, and single hyphens, for example "my-app".`,
    );
  }

  return name;
};

const validateProjectName = (name) => validatePackageName(name, 'Project name');

const validateFeatureName = (name) => validatePackageName(name, 'Feature name');

module.exports = {
  validateFeatureName,
  validatePackageName,
  validateProjectName,
};

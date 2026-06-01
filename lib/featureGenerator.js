const path = require('path');
const { createDirectories, writeFiles } = require('./fileWriter');
const { featureTemplates } = require('./templates');
const { FEATURE_STRUCTURE } = require('./config');
const { camelCase, pascalCase } = require('./helpers');
const { validateFeatureName } = require('./validators');
const logger = require('./logger');

const generateModernFeature = (featureName) => {
  const safeFeatureName = validateFeatureName(featureName);
  const nameUpper = pascalCase(safeFeatureName);
  const nameCamel = camelCase(safeFeatureName);
  const nameLower = safeFeatureName;
  const baseDir = path.join(process.cwd(), 'src', 'features', nameLower);

  logger.build(`Generating feature: ${nameUpper}`);

  try {
    logger.section('Step 1: Create folders');
    createDirectories(baseDir, FEATURE_STRUCTURE);

    logger.section('Step 2: Generate files');
    const files = {
      'types/index.ts': featureTemplates.types(nameUpper),
      [`services/${nameLower}.service.ts`]: featureTemplates.service(nameLower, nameUpper, nameCamel),
      [`api/use-${nameLower}.ts`]: featureTemplates.queries(nameUpper, nameLower, nameCamel),
      [`store/use-${nameLower}-store.ts`]: featureTemplates.store(nameUpper),
      [`components/${nameLower}-card.tsx`]: featureTemplates.card(nameUpper),
      [`${nameLower}-screen.tsx`]: featureTemplates.screen(nameUpper, nameLower),
      'index.ts': featureTemplates.index(nameUpper, nameLower),
    };

    writeFiles(baseDir, files);

    logger.section('Success');
    logger.sparkle(`Feature "${nameUpper}" created successfully.`);
    console.log(`
Generated structure:
  types/       TypeScript definitions
  services/    API services
  api/         TanStack Query hooks
  store/       Zustand store
  components/  UI components

Import it with:
  import { ${nameUpper}Screen } from '@/features/${nameLower}';
`);
  } catch (error) {
    logger.error(`Feature generation failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  generateFeature: generateModernFeature,
  generateModernFeature,
  validateFeatureName,
};

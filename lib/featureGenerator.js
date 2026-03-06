/**
 * FeatureGenerator - Logique de génération de features modulaires
 */

const path = require('path');
const { createDirectories, writeFiles } = require('./fileWriter');
const { featureTemplates } = require('./templates');
const { FEATURE_STRUCTURE } = require('./config');
const { pascalCase } = require('./helpers');
const logger = require('./logger');

const validateFeatureName = (name) => {
  if (!name || typeof name !== 'string') {
    logger.error('Nom de feature requis (ex: booking)');
    process.exit(1);
  }
  return true;
};

const generateModernFeature = (featureName) => {
  validateFeatureName(featureName);

  const nameUpper = pascalCase(featureName);
  const nameLower = featureName.toLowerCase();
  const baseDir = path.join(process.cwd(), 'src', 'features', nameLower);

  logger.build(`Construction de la feature: ${nameUpper}`);

  try {
    // 1. Créer la structure de dossiers
    logger.section('ÉTAPE 1: Création de l\'arborescence');
    createDirectories(baseDir, FEATURE_STRUCTURE);

    // 2. Générer les fichiers
    logger.section('ÉTAPE 2: Génération des fichiers');
    const files = {
      'types/index.ts': featureTemplates.types(nameUpper),
      [`services/${nameLower}.service.ts`]: featureTemplates.service(nameLower, nameUpper),
      [`api/use${nameUpper}s.ts`]: featureTemplates.queries(nameUpper, nameLower),
      [`store/use${nameUpper}Store.ts`]: featureTemplates.store(nameUpper),
      [`components/${nameUpper}Card.tsx`]: featureTemplates.card(nameUpper),
      [`${nameUpper}Screen.tsx`]: featureTemplates.screen(nameUpper, nameLower),
      'index.ts': featureTemplates.index(nameUpper),
    };

    writeFiles(baseDir, files);

    // 3. Afficher le message de succès
    logger.section('✅ SUCCÈS');
    logger.sparkle(`Feature "${nameUpper}" créée avec succès!`);
    console.log(`
📚 Structure générée:
  📁 types/        - Définitions TypeScript
  📁 services/     - Logique API (Axios)
  📁 api/          - Hooks TanStack Query
  📁 store/        - Zustand stores
  📁 components/   - Composants UI
  
💡 Prêt à utiliser:
  import { ${nameUpper}Screen } from '@/features/${nameLower}';
    `);
  } catch (error) {
    logger.error(`Génération échouée: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { generateModernFeature, validateFeatureName };

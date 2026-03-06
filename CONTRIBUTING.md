# Contribution & Extension Guide

## 🎯 How to Extend Expo Forge

### 1. Add a New Dependency

**Cas**: Vous voulez ajouter Realm (base de données local)

```javascript
// lib/config.js
const DEPENDENCIES = [
  // ... dépendances existantes
  'realm',  // ← Ajouter ici
];
```

Les dépendances seront installées lors de `npm run init`.

### 2. Ajouter un Nouveau Dossier à la Structure Initiale

**Cas**: Vous voulez ajouter un dossier `src/middleware`

```javascript
// lib/config.js
const FOLDER_STRUCTURE = [
  // ... dossiers existants
  'src/middleware',  // ← Ajouter ici
];
```

### 3. Ajouter une Nouvelle Feature Template

**Cas**: Vous voulez générer des fichiers pour une "slice Redux"

```javascript
// lib/templates.js
const featureTemplates = {
  // ... templates existants
  
  // Nouveau template
  slice: (nameUpper, nameLower) => `import { createSlice } from '@reduxjs/toolkit';

interface ${nameUpper}State {
  data: any[];
  loading: boolean;
}

const initialState: ${nameUpper}State = {
  data: [],
  loading: false,
};

const ${nameLower}Slice = createSlice({
  name: '${nameLower}',
  initialState,
  reducers: {
    set${nameUpper}Data: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default ${nameLower}Slice.reducer;`,
};
```

Puis utilisez-le dans `lib/featureGenerator.js`:

```javascript
// lib/featureGenerator.js - dans generateModernFeature()
const files = {
  // ... fichiers existants
  `store/${nameLower}.slice.ts`: featureTemplates.slice(nameUpper, nameLower),
};
```

### 4. Ajouter une Nouvelle Étape d'Initialisation

**Cas**: Vous voulez configurer un fichier `.gitignore`

```javascript
// lib/initExpo.js - dans initializeProject()

// Avant ou après les étapes existantes
logger.section('ÉTAPE X: Configuration Git');
const gitignoreContent = `
# Dependencies
node_modules/
.expo/

# Environment
.env
.env.local
`;
writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
logger.success('.gitignore créé');
```

### 5. Ajouter un Nouveau Helper

**Cas**: Vous avez besoin d'une fonction pour formater les dates

```javascript
// lib/helpers.js
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR');
};

module.exports = {
  // ... exports existants
  formatDate,
};
```

Puis utilisez-le:

```javascript
const { formatDate } = require('./helpers');
console.log(formatDate(new Date())); // "06/03/2026"
```

### 6. Ajouter un Nouveau Module Entier

**Cas**: Vous voulez automatiser le déploiement

```javascript
// lib/deployer.js
const logger = require('./logger');
const { executeCommand } = require('./executor');

const deployToEAS = (projectPath) => {
  logger.section('Déploiement sur EAS');
  
  try {
    executeCommand('eas build --platform all');
    logger.success('Build EAS complétée');
  } catch (error) {
    logger.error(`Déploiement échoué: ${error.message}`);
    throw error;
  }
};

module.exports = { deployToEAS };
```

Puis utilisez-le:

```javascript
// lib/initExpo.js
const { deployToEAS } = require('./deployer');

// Dans initializeProject()
deployToEAS(projectPath);
```

## 📐 Principes de Design

Suivez ces principes pour maintenir la qualité:

### 1. **Responsabilité Unique**
Chaque module = une seule responsabilité

❌ Mauvais:
```javascript
// logger-and-executor.js
const log = () => { /* ... */ };
const execute = () => { /* ... */ };
```

✅ Bon:
```javascript
// logger.js
const log = () => { /* ... */ };

// executor.js
const execute = () => { /* ... */ };
```

### 2. **Inversion des Dépendances**
Les modules bas-niveau ne dépendent pas des hauts

❌ Mauvais:
```javascript
// helpers.js
const { initializeProject } = require('./initExpo');
const capitalize = () => { /* ... */ };
```

✅ Bon:
```javascript
// helpers.js
const capitalize = () => { /* ... */ };

// initExpo.js
const { capitalize } = require('./helpers');
```

### 3. **Pas de Duplication**
Réutilisez les fonctions existantes

❌ Mauvais:
```javascript
// Dans featureGenerator.js ET initExpo.js
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
```

✅ Bon:
```javascript
// helpers.js
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// featureGenerator.js et initExpo.js
const { capitalize } = require('./helpers');
```

### 4. **Gestion d'Erreurs Cohérente**
Utilisez toujours logger.error() + process.exit()

```javascript
try {
  // ...
} catch (error) {
  logger.error(`Message descriptif: ${error.message}`);
  process.exit(1);
}
```

### 5. **Pas de Side Effects Inattendus**
Les fonctions pures sont meilleures

✅ Bon:
```javascript
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
// Pas d'I/O, pas de mutations
```

❌ Mauvais:
```javascript
const capitalize = (str) => {
  const result = str.charAt(0).toUpperCase() + str.slice(1);
  fs.writeFileSync('log.txt', result); // Side effect!
  return result;
};
```

## 🧪 Comment Tester Vos Modifications

### Test Manuel
```bash
# Tester l'initialisation
node init-expo.js test-app

# Tester la génération de feature
cd test-app
node ../generate-feature.js generate feature myfeature

# Vérifier la structure
ls -la src/features/myfeature
```

### Test de Module
```javascript
// test/helpers.test.js
const { capitalize, pascalCase } = require('../lib/helpers');

console.assert(capitalize('hello') === 'Hello', 'capitalize failed');
console.assert(pascalCase('hello') === 'Hello', 'pascalCase failed');
console.log('✅ All tests passed');
```

Exécutez:
```bash
node test/helpers.test.js
```

## 📋 Checklist Avant de Commit

- [ ] Code respecte les principes SOLID
- [ ] Pas de duplication
- [ ] Gestion d'erreurs cohérente
- [ ] Logs informatifs
- [ ] Testé manuellement
- [ ] README mis à jour si nécessaire
- [ ] ARCHITECTURE.md mis à jour

## 🚀 Exemple Complet: Ajouter une Feature "Stripe"

### Étape 1: Ajouter les dépendances
```javascript
// lib/config.js
const DEPENDENCIES = [
  // ...
  '@stripe/stripe-react-native',
];
```

### Étape 2: Ajouter un dossier
```javascript
// lib/config.js
const FOLDER_STRUCTURE = [
  // ...
  'src/integration/stripe',
];
```

### Étape 3: Créer les templates
```javascript
// lib/templates.js
const initTemplates = {
  // ...
  stripeConfig: () => `import { StripeProvider } from '@stripe/stripe-react-native';

export const publishableKey = process.env.EXPO_PUBLIC_STRIPE_KEY || '';

export const StripeProviderWrapper = ({ children }) => (
  <StripeProvider publishableKey={publishableKey}>
    {children}
  </StripeProvider>
);`,
};
```

### Étape 4: Utiliser dans l'initialisation
```javascript
// lib/initExpo.js - dans initializeProject()
const files = {
  // ...
  'src/integration/stripe/config.tsx': initTemplates.stripeConfig(),
};
```

### Étape 5: Tester
```bash
node init-expo.js stripe-app
ls src/integration/stripe
cat src/integration/stripe/config.tsx
```

Voilà! 🎉

## 💡 Conseils

- Gardez les modules petits (< 200 lignes)
- Documentez les fonctions complexes
- Utilisez des noms explicites
- Groupez les imports par type (core, lib, local)
- Testez vos modifications avant de les partager

Au plaisir de vos contributions! 🚀

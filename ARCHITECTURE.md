# Technical Architecture - Data Flow

## 🏗️ Module Organigram

```
┌─────────────────────────────────────────────┐
│   init-expo.js / generate-feature.js        │ ← Entry Points
└──────────────┬──────────────────────────────┘
               │
               ├─→ initExpo.js ─────────┐
               │                        │
               └─→ featureGenerator.js ┤
                                       │
                    vs
                      │
               ┌──────┴────────┐
               │               │
         ┌─────▼────┐    ┌─────▼────┐
         │ executor │    │ fileWriter│
         └─────┬────┘    └─────┬────┘
               │               │
         ┌─────▼───────────────▼────┐
         │   logger, helpers, config │
         └──────────────────────────┘
               │
         ┌─────▼──────────┐
         │   templates    │
         └────────────────┘
```

## 📊 Flux d'Exécution - Initialisation de Projet

```
1. init-expo.js
   └─→ initExpo.initializeProject()
       ├─→ executor.executeCommand()
       │   └─→ npx create-expo-app
       ├─→ executor.changeDirectory()
       ├─→ executor.executeCommand()
       │   └─→ npx expo install
       ├─→ fileWriter.createDirectories()
       │   └─→ FOLDER_STRUCTURE
       ├─→ initTemplates (tous les fichiers)
       └─→ fileWriter.writeFiles()
           └─→ logger.success()
```

## 📊 Flux d'Exécution - Génération de Feature

```
1. generate-feature.js
   └─→ featureGenerator.generateModernFeature()
       ├─→ helpers.pascalCase() / .toLowerCase()
       ├─→ fileWriter.createDirectories()
       │   └─→ FEATURE_STRUCTURE
       ├─→ featureTemplates (7 fichiers)
       │   ├─→ types()
       │   ├─→ service()
       │   ├─→ queries()
       │   ├─→ store()
       │   ├─→ card()
       │   ├─→ screen()
       │   └─→ index()
       └─→ fileWriter.writeFiles()
           └─→ logger.success()
```

## 🔄 Cycle de Vie d'une Feature

```
Feature: "booking"

1. pascalCase → "Booking"
2. toLowerCase → "booking"

3. Créer dossiers:
   src/features/booking/
   ├── api/
   ├── components/
   ├── hooks/
   ├── services/
   ├── store/
   ├── types/
   └── utils/

4. Générer fichiers:
   ├── types/index.ts
   │   └─→ export type Booking, CreateBookingDTO, UpdateBookingDTO
   │
   ├── services/booking.service.ts
   │   └─→ getAll, getById, create, update, delete
   │
   ├── api/useBookings.ts (hooks TanStack Query)
   │   └─→ useBookings, useBooking, useCreateBooking, useUpdateBooking, useDeleteBooking
   │
   ├── store/useBookingStore.ts (Zustand)
   │   └─→ filter, sortBy, setFilter, setSortBy
   │
   ├── components/BookingCard.tsx
   │   └─→ Composant UI réutilisable
   │
   ├── BookingScreen.tsx
   │   └─→ Écran principal
   │
   └── index.ts
       └─→ Exports publiques
```

## 📦 Dépendances Entre Modules

```
logger.js
  ↓
helpers.js ← config.js
  ↓          ↓
fileWriter.js  executor.js
  ↓          ↓
templates.js
  ↓
initExpo.js ← featureGenerator.js
  ↓          ↓
Entry Points: init-expo.js, generate-feature.js
```

## 🎯 Responsabilités par Module

| Module | Responsabilité | Exports |
|--------|-----------------|---------|
| **logger.js** | Logs formatés avec couleurs | `success, error, info, build, rocket...` |
| **helpers.js** | Transformation de chaînes | `capitalize, pascalCase, camelCase, kebabCase` |
| **config.js** | Configuration centralisée | `DEPENDENCIES, FOLDER_STRUCTURE, FEATURE_STRUCTURE` |
| **executor.js** | Exécution de commandes | `executeCommand, executeCommandSilent, changeDirectory` |
| **fileWriter.js** | Gestion fichiers/dossiers | `createDirectories, writeFiles, readFile` |
| **templates.js** | Templates de code | `initTemplates, featureTemplates` |
| **initExpo.js** | Logique d'initialisation | `initializeProject` |
| **featureGenerator.js** | Logique de génération | `generateModernFeature, validateFeatureName` |

## 🔌 Points d'Extension

### Ajouter une nouvelle dependency
```javascript
// lib/config.js
DEPENDENCIES.push('my-package');
```

### Ajouter un nouveau dossier
```javascript
// lib/config.js
FOLDER_STRUCTURE.push('src/my-folder');
```

### Ajouter un nouveau template
```javascript
// lib/templates.js
featureTemplates.myTemplate = (name) => {
  return `// code...`;
};
```

### Ajouter une nouvelle étape d'initialisation
```javascript
// lib/initExpo.js
// Dans initializeProject()
logger.section('ÉTAPE X: Description');
// Ajouter le code
```

## ✅ Tests Possibles

### Unitaires
- `helpers.js` - Tester capitalize(), pascalCase(), etc.
- `logger.js` - Vérifier les outputs
- `fileWriter.js` - Mocks du fs module

### Intégration
- `initExpo.js` - Créer un projet de test
- `featureGenerator.js` - Générer une feature de test

### E2E
- Flux complet: init → generate features → vérifier structure

## 📈 Scalabilité

Pour ajouter de nouvelles fonctionnalités:

1. **Créer un nouveau module dans `lib/`**
   ```javascript
   // lib/myFeature.js
   const myFeature = () => { /* ... */ };
   module.exports = { myFeature };
   ```

2. **L'importer dans le module "parent"**
   ```javascript
   const { myFeature } = require('./myFeature');
   ```

3. **L'utiliser dans la logique**
   ```javascript
   myFeature();
   ```

4. **Tester indépendamment**

C'est une architecture SOLID et maintenable! 🎉

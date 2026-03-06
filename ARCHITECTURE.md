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

## 📊 Execution Flow - Project Initialization

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
       ├─→ initTemplates (all files)
       └─→ fileWriter.writeFiles()
           └─→ logger.success()
```

## 📊 Execution Flow - Feature Generation

```
1. generate-feature.js
   └─→ featureGenerator.generateModernFeature()
       ├─→ helpers.pascalCase() / .toLowerCase()
       ├─→ fileWriter.createDirectories()
       │   └─→ FEATURE_STRUCTURE
       ├─→ featureTemplates (7 files)
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

## 🔄 Feature Lifecycle

```
Feature: "booking"

1. pascalCase → "Booking"
2. toLowerCase → "booking"

3. Create folders:
   src/features/booking/
   ├── api/
   ├── components/
   ├── hooks/
   ├── services/
   ├── store/
   ├── types/
   └── utils/

4. Generate files:
   ├── types/index.ts
   │   └─→ export type Booking, CreateBookingDTO, UpdateBookingDTO
   │
   ├── services/booking.service.ts
   │   └─→ getAll, getById, create, update, delete
   │
   ├── api/useBookings.ts (TanStack Query hooks)
   │   └─→ useBookings, useBooking, useCreateBooking, useUpdateBooking, useDeleteBooking
   │
   ├── store/useBookingStore.ts (Zustand)
   │   └─→ filter, sortBy, setFilter, setSortBy
   │
   ├── components/BookingCard.tsx
   │   └─→ Reusable UI component
   │
   ├── BookingScreen.tsx
   │   └─→ Main screen
   │
   └── index.ts
       └─→ Public exports
```

## 📦 Module Dependencies

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

## 🎯 Responsibility per Module

| Module                  | Responsibility             | Exports                                                 |
| ----------------------- | -------------------------- | ------------------------------------------------------- |
| **logger.js**           | Formatted logs with colors | `success, error, info, build, rocket...`                |
| **helpers.js**          | String transformations     | `capitalize, pascalCase, camelCase, kebabCase`          |
| **config.js**           | Centralized configuration  | `DEPENDENCIES, FOLDER_STRUCTURE, FEATURE_STRUCTURE`     |
| **executor.js**         | System command execution   | `executeCommand, executeCommandSilent, changeDirectory` |
| **fileWriter.js**       | File/directory management  | `createDirectories, writeFiles, readFile`               |
| **templates.js**        | Code templates             | `initTemplates, featureTemplates`                       |
| **initExpo.js**         | Initialization logic       | `initializeProject`                                     |
| **featureGenerator.js** | Generation logic           | `generateModernFeature, validateFeatureName`            |

## 🔌 Extension Points

### Add a new dependency

```javascript
// lib/config.js
DEPENDENCIES.push("my-package");
```

### Add a new folder

```javascript
// lib/config.js
FOLDER_STRUCTURE.push("src/my-folder");
```

### Add a new template

```javascript
// lib/templates.js
featureTemplates.myTemplate = (name) => {
  return `// code...`;
};
```

### Add a new initialization step

```javascript
// lib/initExpo.js
// Inside initializeProject()
logger.section("STEP X: Description");
// Add the code
```

## ✅ Available Tests

### Unit Tests

- `helpers.js` - Test capitalize(), pascalCase(), etc.
- `logger.js` - Verify outputs
- `fileWriter.js` - Mock fs module

### Integration Tests

- `initExpo.js` - Create a test project
- `featureGenerator.js` - Generate a test feature

### E2E Tests

- Full flow: init → generate features → verify structure

## 📈 Scalability

To add new features:

1. **Create a new module in `lib/`**

   ```javascript
   // lib/myFeature.js
   const myFeature = () => {
     /* ... */
   };
   module.exports = { myFeature };
   ```

2. **Import it in the "parent" module**

   ```javascript
   const { myFeature } = require("./myFeature");
   ```

3. **Use it in the logic**

   ```javascript
   myFeature();
   ```

4. **Test independently**

This is a SOLID and maintainable architecture! 🎉

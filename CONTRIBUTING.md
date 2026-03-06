# Contribution & Extension Guide

Welcome to the **Expo Forge** contribution guide! This document explains how to extend the CLI and follow our design principles.

## 🎯 How to Extend Expo Forge

### 1. Add a New Dependency

**Case**: You want to add `realm` (local database) to all new projects.

```javascript
// lib/config.js
const DEPENDENCIES = [
  // ... existing dependencies
  "realm", // ← Add here
];
```

The dependencies will be automatically installed during `expo-forge init`.

### 2. Add a New Directory to the Initial Structure

**Case**: You want to add a `src/middleware` folder to the scaffold.

```javascript
// lib/config.js
const FOLDER_STRUCTURE = [
  // ... existing folders
  "src/middleware", // ← Add here
];
```

### 3. Add a New Feature Template

**Case**: You want to generate files for a "Redux slice" when creating a feature.

```javascript
// lib/templates.js
const featureTemplates = {
  // ... existing templates

  // New template
  slice: (
    nameUpper,
    nameLower,
  ) => `import { createSlice } from '@reduxjs/toolkit';

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

Then use it in `lib/featureGenerator.js`:

```javascript
// lib/featureGenerator.js - inside generateModernFeature()
const files = {
  // ... existing files
  [`store/${nameLower}.slice.ts`]: featureTemplates.slice(nameUpper, nameLower),
};
```

### 4. Add a New Initialization Step

**Case**: You want to configure a custom `.gitignore` file during project setup.

```javascript
// lib/initExpo.js - inside initializeProject()

// Before or after existing steps
logger.section("STEP X: Git Configuration");
const gitignoreContent = `
# Dependencies
node_modules/
.expo/

# Environment
.env
.env.local
`;
writeFile(path.join(projectPath, ".gitignore"), gitignoreContent);
logger.success(".gitignore created");
```

### 5. Add a New Helper

**Case**: You need a utility function to format dates.

```javascript
// lib/helpers.js
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US");
};

module.exports = {
  // ... existing exports
  formatDate,
};
```

Then use it:

```javascript
const { formatDate } = require("./helpers");
console.log(formatDate(new Date())); // "03/06/2026"
```

### 6. Create a New Module

**Case**: You want to automate deployment steps.

```javascript
// lib/deployer.js
const logger = require("./logger");
const { executeCommand } = require("./executor");

const deployToEAS = (projectPath) => {
  logger.section("Deploying to EAS");

  try {
    executeCommand("eas build --platform all");
    logger.success("EAS Build completed");
  } catch (error) {
    logger.error(`Deployment failed: ${error.message}`);
    throw error;
  }
};

module.exports = { deployToEAS };
```

Then integrate it:

```javascript
// lib/initExpo.js
const { deployToEAS } = require("./deployer");

// Inside initializeProject()
deployToEAS(projectPath);
```

## 📐 Design Principles

Follow these principles to maintain high code quality:

### 1. **Single Responsibility (SRP)**

Each module should have one responsibility.

❌ Bad:

```javascript
// logger-and-executor.js
const log = () => {
  /* ... */
};
const execute = () => {
  /* ... */
};
```

✅ Good:

```javascript
// logger.js
const log = () => {
  /* ... */
};

// executor.js
const execute = () => {
  /* ... */
};
```

### 2. **Dependency Inversion**

Low-level modules should not depend on high-level ones.

❌ Bad:

```javascript
// helpers.js
const { initializeProject } = require("./initExpo");
const capitalize = () => {
  /* ... */
};
```

✅ Good:

```javascript
// helpers.js
const capitalize = () => {
  /* ... */
};

// initExpo.js
const { capitalize } = require("./helpers");
```

### 3. **DRY (Don't Repeat Yourself)**

Reuse existing utility functions.

❌ Bad:

```javascript
// In featureGenerator.js AND initExpo.js
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
```

✅ Good:

```javascript
// helpers.js
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// featureGenerator.js and initExpo.js
const { capitalize } = require("./helpers");
```

### 4. **Consistent Error Handling**

Always use `logger.error()` followed by `process.exit(1)`.

```javascript
try {
  // ...
} catch (error) {
  logger.error(`Descriptive message: ${error.message}`);
  process.exit(1);
}
```

### 5. **Pure Functions (Avoid Side Effects)**

Prefer pure functions without hidden side effects.

✅ Good:

```javascript
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
// No I/O, no mutations
```

❌ Bad:

```javascript
const capitalize = (str) => {
  const result = str.charAt(0).toUpperCase() + str.slice(1);
  fs.writeFileSync("log.txt", result); // Unexpected side effect!
  return result;
};
```

## 🧪 How to Test Your Changes

### Manual Testing

```bash
# Test project initialization
node init-expo.js test-app

# Test feature generation
cd test-app
node ../generate-feature.js generate feature myfeature

# Verify structure
ls -la src/features/myfeature
```

### Module Testing

```javascript
// test/helpers.test.js
const { capitalize, pascalCase } = require("../lib/helpers");

console.assert(capitalize("hello") === "Hello", "capitalize failed");
console.assert(pascalCase("hello") === "Hello", "pascalCase failed");
console.log("✅ All tests passed");
```

Run with:

```bash
node test/helpers.test.js
```

## 📋 Pre-Commit Checklist

- [ ] Code follows SOLID principles
- [ ] No code duplication (DRY)
- [ ] Consistent error handling implemented
- [ ] Informative logs added
- [ ] Manually tested local changes
- [ ] README.md updated if necessary
- [ ] ARCHITECTURE.md updated if necessary

## 🚀 Full Example: Adding a "Stripe" Integration

### Step 1: Add Dependencies

```javascript
// lib/config.js
const DEPENDENCIES = [
  // ...
  "@stripe/stripe-react-native",
];
```

### Step 2: Add Folder

```javascript
// lib/config.js
const FOLDER_STRUCTURE = [
  // ...
  "src/integration/stripe",
];
```

### Step 3: Create Templates

```javascript
// lib/templates.js
const initTemplates = {
  // ...
  stripeConfig:
    () => `import { StripeProvider } from '@stripe/stripe-react-native';

export const publishableKey = process.env.EXPO_PUBLIC_STRIPE_KEY || '';

export const StripeProviderWrapper = ({ children }) => (
  <StripeProvider publishableKey={publishableKey}>
    {children}
  </StripeProvider>
);`,
};
```

### Step 4: Map in Initialization

```javascript
// lib/initExpo.js - inside initializeProject()
const files = {
  // ...
  "src/integration/stripe/config.tsx": initTemplates.stripeConfig(),
};
```

### Step 5: Verify

```bash
node init-expo.js stripe-app
ls src/integration/stripe
cat src/integration/stripe/config.tsx
```

That's it! 🎉

## 💡 Pro Tips

- Keep modules small (< 200 lines)
- Document complex logic
- Use explicit and descriptive names
- Group imports by type (Node.js, third-party, local)
- Use `npm run test` before committing

Happy forging! 🚀

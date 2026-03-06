# Expo Forge - Publication Guide

## 📦 NPM Publishing

### Prerequisites

1. **NPM Account**: Create an account on [npmjs.com](https://npmjs.com)
2. **Authentication**: Login using `npm login`
3. **GitHub Repository**: Ensure the `expo-forge` repository exists on GitHub

### Publishing Steps

#### 1. Final Tests

```bash
npm run test
npm run pack
```

#### 2. Beta Publication (Recommended)

```bash
npm run publish:beta
```

#### 3. Verification

- Verify the package on [npmjs.com/package/expo-forge](https://npmjs.com/package/expo-forge)
- Test the installation globally: `npm install -g expo-forge@beta`

#### 4. Stable Publication

```bash
npm run publish:latest
```

### Usage After Installation

```bash
# Global installation
npm install -g expo-forge

# Initialize a project
expo-forge init my-app

# Generate a feature
expo-forge generate feature booking

# View help
expo-forge --help
```

### Maintenance

#### New Version Releases

```bash
# Patch (1.0.0 -> 1.0.1)
npm run version:patch
npm run publish:latest

# Minor (1.0.0 -> 1.1.0)
npm run version:minor
npm run publish:latest

# Major (1.0.0 -> 2.0.0)
npm run version:major
npm run publish:latest
```

#### Updating the Package

1. Modify the code
2. Bump the version: `npm version patch` (or minor/major)
3. Test changes: `npm run test`
4. Publish: `npm run publish:latest`

### Package Structure

```
expo-forge-2.0.0.tgz
├── bin/
│   └── expo-forge.js      # CLI entry point
├── lib/
│   ├── config.js          # Configuration
│   ├── executor.js        # Command execution
│   ├── featureGenerator.js # Feature generation
│   ├── fileWriter.js      # File operations
│   ├── helpers.js         # Utilities
│   ├── index.js           # Main module
│   ├── initExpo.js        # Project initialization
│   ├── logger.js          # Logging
│   └── templates.js       # Code templates
├── package.json           # Package metadata
├── README.md              # Documentation
└── LICENSE                # MIT License
```

### Troubleshooting

#### Publishing Error

- Ensure the name `expo-forge` isn't already taken or requires scoping
- Make sure you are authenticated: `npm whoami`
- Verify your package permissions

#### Installation Issues

- Clear the NPM cache: `npm cache clean --force`
- Reinstall the package: `npm uninstall -g expo-forge && npm install -g expo-forge`

#### Failing Tests

- Verify that all files in `lib/` exist and are required correctly
- Ensure `commander` is installed: `npm install`
- Check file permissions for execution (`chmod +x bin/expo-forge.js`)

### Package Metrics

- **Size**: ~8.7 kB
- **Files**: 13
- **Dependencies**: commander (^11.1.0)
- **Node**: >=16.0.0
- **NPM**: >=7.0.0

---

🎉 **Expo Forge is now ready for npm publication!**

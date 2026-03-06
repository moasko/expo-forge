# Expo Forge - Publication Guide

## 📦 Publication sur NPM

### Prérequis

1. **Compte NPM** : Créez un compte sur [npmjs.com](https://npmjs.com)
2. **Authentification** : Connectez-vous avec `npm login`
3. **GitHub Repository** : Créez le repo `expo-forge` sur GitHub

### Étapes de Publication

#### 1. Test Final
```bash
npm run test
npm run pack
```

#### 2. Publication Bêta (Recommandé)
```bash
npm run publish:beta
```

#### 3. Vérification
- Vérifiez sur [npmjs.com/package/expo-forge](https://npmjs.com/package/expo-forge)
- Testez l'installation : `npm install -g expo-forge@beta`

#### 4. Publication Stable
```bash
npm run publish:latest
```

### Utilisation après Installation

```bash
# Installation globale
npm install -g expo-forge

# Initialiser un projet
expo-forge init my-app

# Générer une feature
expo-forge generate feature booking

# Aide
expo-forge --help
```

### Maintenance

#### Nouvelle Version
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

#### Mise à jour du Package
1. Modifiez le code
2. Mettez à jour la version : `npm version patch`
3. Testez : `npm run test`
4. Publiez : `npm run publish:latest`

### Structure du Package

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

#### Erreur de Publication
- Vérifiez que le nom `expo-forge` n'est pas déjà pris
- Assurez-vous d'être connecté : `npm whoami`
- Vérifiez les permissions du package

#### Problèmes d'Installation
- Nettoyez le cache : `npm cache clean --force`
- Réinstallez : `npm uninstall -g expo-forge && npm install -g expo-forge`

#### Tests Échouent
- Vérifiez que tous les fichiers lib/ existent
- Assurez-vous que commander est installé : `npm install`
- Vérifiez les permissions des fichiers

### Métriques du Package

- **Taille** : 8.7 kB
- **Fichiers** : 13
- **Dépendances** : commander (^11.1.0)
- **Node** : >=16.0.0
- **NPM** : >=7.0.0

---

🎉 **Expo Forge est maintenant prêt pour la publication npm !**
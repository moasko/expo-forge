# 📚 Index & Navigation

Welcome to **Expo Forge** - the bulletproof Expo architecture generator! This guide helps you navigate the project structure and documentation.

## 🗂️ Complete Structure

```
expo/
│
├── 📄 Main Files (Entry Points)
│   ├── init-expo.js         ← Project initialization
│   └── generate-feature.js  ← Feature generation
│
├── 📦 Core Modules (lib/)
│   ├── config.js            ← Centralized configuration
│   ├── executor.js          ← Shell command runner
│   ├── featureGenerator.js  ← Domain generation logic
│   ├── fileWriter.js        ← File I/O operations
│   ├── helpers.js           ← String & utility helpers
│   ├── initExpo.js          ← Init orchestration
│   ├── logger.js            ← Formatted CLI logging
│   └── templates.js         ← All code templates
│
├── 📖 Documentation
│   ├── README.md            ← Main documentation
│   ├── ARCHITECTURE.md      ← Technical architecture
│   ├── CONTRIBUTING.md      ← Contribution & extension guide
│   ├── DEMO.md              ← Quickstart & examples
│   ├── STRUCTURE.md         ← Before/After overview
│   ├── IMPROVEMENTS.md      ← Detailed improvements
│   └── INDEX.md             ← This file
│
├── 📝 Configuration
│   └── package.json         ← Project meta & scripts
│
└── .gitignore               ← Git exclusion rules
```

## 🎯 Quick Navigation

### 🚀 **Getting Started**

```
→ DEMO.md : 5 minutes to try it out
```

### 📚 **Learn the Architecture**

```
→ ARCHITECTURE.md : Diagrams and data flows
→ STRUCTURE.md : Before/After architectural comparison
```

### 🔧 **Using the Generator**

```
→ README.md : Full usage documentation
→ DEMO.md : Practical code examples
```

### 🤝 **Contributing & Extending**

```
→ CONTRIBUTING.md : Official extension guide
→ ARCHITECTURE.md : How it works under the hood
→ lib/*.js : Browse the source code
```

### 📊 **Understand the Refactor**

```
→ IMPROVEMENTS.md : Detailed Before/After analysis
→ STRUCTURE.md : Quality & complexity metrics
```

### 💻 **Developing with Forge**

```
→ lib/templates.js : Browse all code templates
→ lib/config.js : Global configuration & dependencies
→ lib/helpers.js : Available utility functions
```

## 📖 Guides by Use Case

### Case 1️⃣ : "I want to try it quickly"

1. Read [DEMO.md](DEMO.md) (5 min).
2. Run: `npm run init my-app`.
3. Run: `npm run gen:feature -- --name=booking`.
4. Check: `ls my-app/src/features/booking`.

### Case 2️⃣ : "I want to understand how it works"

1. Read [ARCHITECTURE.md](ARCHITECTURE.md).
2. Read [STRUCTURE.md](STRUCTURE.md).
3. Explore [lib/](lib/) file by file.
4. Read the in-code comments.

### Case 3️⃣ : "I want to add a new feature to the generator"

1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Decide which module to update.
3. Modify the relevant module in `lib/`.
4. Test manually by running the CLI.
5. Document your changes.

### Case 4️⃣ : "I want to use Forge in my own project"

1. Copy the `lib/` directory into your project.
2. Import what you need:
   ```javascript
   const { initializeProject } = require("./lib/initExpo");
   const { generateModernFeature } = require("./lib/featureGenerator");
   ```
3. Call programmatically from your own scripts.
4. Adapt templates as needed.

### Case 5️⃣ : "I want to test or debug"

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) – Testing section.
2. Create a test app: `node init-expo.js test-app`.
3. Generate a feature: `node generate-feature.js generate feature test`.
4. Verify the generated structure.
5. Debug within [lib/](lib/).

### Case 6️⃣ : "I want to contribute back"

1. Fork the repository.
2. Read [CONTRIBUTING.md](CONTRIBUTING.md).
3. Implement your improvements.
4. Run tests.
5. Create a Pull Request.

## 📑 Documentation Files

### [README.md](README.md) 📘

**Best for:** General usage & installation.  
**Time:** 10 minutes.  
**Includes:**

- Project overview.
- Installation instructions.
- Usage guide.
- Technical stack details.
- CLI API reference.

### [ARCHITECTURE.md](ARCHITECTURE.md) 🏗️

**Best for:** Technical deep dives.  
**Time:** 15 minutes.

- Module organigram.
- Detailed execution flows.
- Inter-module dependencies.
- Responsibilities per module.
- Extension points.

### [CONTRIBUTING.md](CONTRIBUTING.md) 🤝

**Best for:** Developers and contributors.  
**Time:** 20 minutes.

- How to add dependencies, templates, steps, or helpers.
- Full custom module addition guide.
- Design principles (SOLID).
- Manual & unit testing guide.
- Pre-commit checklist.

### [DEMO.md](DEMO.md) 🎬

**Best for:** Direct action & quick wins.  
**Time:** 5 minutes.

- Quickstart steps.
- Code usage examples.
- Complete final structure overview.
- Troubleshooting tips.

### [STRUCTURE.md](STRUCTURE.md) 📊

**Best for:** Understanding the refactor.  
**Time:** 5 minutes.

- Before vs After comparison.
- Metrics & quality gains.
- Responsibility flow diagrams.
- Future evolution goals.

### [IMPROVEMENTS.md](IMPROVEMENTS.md) ✨

**Best for:** Detailed metric analysis.  
**Time:** 15 minutes.

- Detailed Before/After code snippets.
- Quality metrics & benchmarks.
- Comparative use cases.
- Impact on long-term maintenance.

## 🎓 Learning Paths

### Beginner (30 min)

1. [DEMO.md](DEMO.md) - Quickstart.
2. [README.md](README.md) - Project Overview.
3. Run: `npm run init` manually.

### Intermediate (1 hour)

1. [STRUCTURE.md](STRUCTURE.md) - Structural comparison.
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Under-the-hood.
3. Explore [lib/](lib/) - Read the source code.
4. [CONTRIBUTING.md](CONTRIBUTING.md) - Simple extensions.

### Advanced (2 hours)

1. Read entire [lib/](lib/) source code.
2. Review all [lib/templates.js](lib/templates.js).
3. [CONTRIBUTING.md](CONTRIBUTING.md) - Advanced architectural concepts.
4. Build your own custom generator module.

## 💡 Quick FAQ

### Q: Where do I start?

**A:** Read [DEMO.md](DEMO.md) first – 5 minutes is all you need!

### Q: How does it work technically?

**A:** Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical diagrams.

### Q: I want to add a feature.

**A:** Follow [CONTRIBUTING.md](CONTRIBUTING.md) step-by-step.

### Q: Where are the code templates?

**A:** Everything is in [lib/templates.js](lib/templates.js).

### Q: I want to customize dependencies.

**A:** Edit [lib/config.js](lib/config.js).

### Q: What actually changed during the refactor?

**A:** Read [IMPROVEMENTS.md](IMPROVEMENTS.md) or [STRUCTURE.md](STRUCTURE.md).

### Q: How do I run tests?

**A:** Read the Testing section in [DEMO.md](DEMO.md) or use `npm test`.

## 🔗 Quick Links

| Goal         | File                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| Start        | [DEMO.md](DEMO.md)                                                       |
| Use          | [README.md](README.md)                                                   |
| Understand   | [ARCHITECTURE.md](ARCHITECTURE.md)                                       |
| Extend       | [CONTRIBUTING.md](CONTRIBUTING.md)                                       |
| Explore      | [lib/](lib/)                                                             |
| Compare      | [STRUCTURE.md](STRUCTURE.md)                                             |
| In-depth     | [IMPROVEMENTS.md](IMPROVEMENTS.md)                                       |
| Entry Points | [init-expo.js](init-expo.js), [generate-feature.js](generate-feature.js) |

## 🗺️ Mind Map

```
EXPO FORGE
│
├─ 🚀 GETTING STARTED
│  └─ DEMO.md
│
├─ 📖 LEARN
│  ├─ README.md
│  ├─ ARCHITECTURE.md
│  └─ STRUCTURE.md
│
├─ 🛠️ EXTEND
│  └─ CONTRIBUTING.md
│
├─ 🔍 EXPLORE
│  └─ lib/
│     ├─ config.js
│     ├─ executor.js
│     ├─ featureGenerator.js
│     ├─ fileWriter.js
│     ├─ helpers.js
│     ├─ initExpo.js
│     ├─ logger.js
│     └─ templates.js
│
└─ 📊 ANALYZE
   ├─ IMPROVEMENTS.md
   ├─ STRUCTURE.md
   └─ ARCHITECTURE.md
```

## 🎯 Recommended Next Steps

1. **Now** (< 5 min)
   - Read this index.
   - Explore the directory with `ls -la`.

2. **Soon** (5-10 min)
   - Read [DEMO.md](DEMO.md).
   - Run `npm run init test-app`.

3. **Later** (Deep dive)
   - Read [ARCHITECTURE.md](ARCHITECTURE.md).
   - Contribute an improvement or custom template.
   - Integrate Forge into your production workflow.

## 📞 Need Help?

- 🚀 **Quickstart**: [DEMO.md](DEMO.md)
- 📖 **Deep Dive**: [ARCHITECTURE.md](ARCHITECTURE.md)
- 🛠️ **Customization**: [CONTRIBUTING.md](CONTRIBUTING.md)
- ❔ **Questions**: See FAQs above.
- 💻 **Support**: Open an issue on GitHub.

## 🎉 Summary

You have access to:

✅ **Highly organized code** – 8 focused modules.  
✅ **Comprehensive documentation** – 6 deep guides.  
✅ **Practical examples** – 20+ real-world code snippets.  
✅ **Solid architecture** – Strict SOLID principles.  
✅ **Contribution ready** – Detailed extension guide.

Start with **[DEMO.md](DEMO.md)** and enjoy forging! 🚀

---

**Happy Coding!** 😊

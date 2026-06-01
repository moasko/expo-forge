const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const logger = {
  success: (msg) => console.log(`${colors.green}[OK] ${msg}${colors.reset}`),
  error: (msg) => console.error(`${colors.red}[ERROR] ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}[INFO] ${msg}${colors.reset}`),
  warning: (msg) => console.warn(`${colors.yellow}[WARN] ${msg}${colors.reset}`),
  build: (msg) => console.log(`${colors.cyan}[BUILD] ${msg}${colors.reset}`),
  rocket: (msg) => console.log(`${colors.cyan}[START] ${msg}${colors.reset}`),
  package: (msg) => console.log(`${colors.blue}[PACKAGE] ${msg}${colors.reset}`),
  sparkle: (msg) => console.log(`${colors.green}[DONE] ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.cyan}---- ${msg} ----${colors.reset}\n`),
};

module.exports = logger;

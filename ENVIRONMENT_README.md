# Environment Variables Configuration

This guide covers the comprehensive environment variable setup for the PiHR Playwright automation project, including URL management, test data, and configuration across different environments.

## 🌍 Environment Overview

### Benefits

- **Centralized Configuration**: All URLs and settings in one place
- **Environment-Specific Settings**: Different configurations for dev, staging, production
- **Security**: Sensitive data kept out of code
- **Flexibility**: Easy to switch between environments
- **CI/CD Integration**: Seamless integration with automated pipelines

## 📁 Environment Files

### 1. Environment Template (`env.example`)

```bash
# Copy the template to create your environment file
npm run env:setup

# This creates a .env file with all required variables
```

### 2. Environment Configuration (`tests/config/environment.ts`)

```typescript
// Loads environment variables and provides type-safe access
import { config, getTestData, getUrls } from "../config/environment";
```

## 🔧 Environment Variables

### Application URLs

```bash
# Base application URL
BASE_URL=https://webable.pihr.xyz

# Specific page URLs
LOGIN_URL=https://webable.pihr.xyz/login
DASHBOARD_URL=https://webable.pihr.xyz/dashboard
JOB_CARD_URL=https://webable.pihr.xyz/job-card
ATTENDANCE_URL=https://webable.pihr.xyz/attendance
```

### Test Data

```bash
# Test credentials
TEST_USERNAME=01830377213
TEST_PASSWORD=nopass@1234
TEST_EMAIL=test@example.com
```

### Environment Configuration

```bash
# Environment settings
NODE_ENV=development
PLAYWRIGHT_HEADLESS=false
PLAYWRIGHT_TIMEOUT=30000
PLAYWRIGHT_RETRIES=2
```

### Browser Configuration

```bash
# Browser settings
BROWSER_TYPE=chromium
BROWSER_WIDTH=1920
BROWSER_HEIGHT=1080
```

## 🚀 Quick Start

### 1. Setup Environment File

```bash
# Create environment file from template
npm run env:setup

# Validate environment variables
npm run env:validate
```

### 2. Update Environment Variables

```bash
# Edit .env file with your values
nano .env

# Example .env file:
BASE_URL=https://webable.pihr.xyz
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
NODE_ENV=development
```

### 3. Run Tests with Environment

```bash
# Development environment
npm run env:dev

# Staging environment
npm run env:staging

# Production environment
npm run env:prod
```

## 🎯 Environment-Specific Configurations

### Development Environment

```bash
NODE_ENV=development
PLAYWRIGHT_HEADLESS=false
DEBUG_MODE=true
LOG_LEVEL=debug
```

### Staging Environment

```bash
NODE_ENV=staging
PLAYWRIGHT_HEADLESS=true
DEBUG_MODE=false
LOG_LEVEL=info
```

### Production Environment

```bash
NODE_ENV=production
PLAYWRIGHT_HEADLESS=true
DEBUG_MODE=false
LOG_LEVEL=warn
ENABLE_SLACK_NOTIFICATIONS=true
```

## 📊 Configuration Categories

### 1. Application URLs

```typescript
// Get URLs from environment
const urls = getUrls();
console.log(urls.base); // https://webable.pihr.xyz
console.log(urls.login); // https://webable.pihr.xyz/login
```

### 2. Test Data

```typescript
// Get test credentials
const testData = getTestData();
console.log(testData.username); // 01830377213
console.log(testData.password); // nopass@1234
```

### 3. Reporting Configuration

```typescript
// Get reporting settings
const reportingConfig = getReportingConfig();
console.log(reportingConfig.allureResultsDir); // allure-results
console.log(reportingConfig.retentionDays); // 30
```

### 4. Notification Configuration

```typescript
// Get notification settings
const notificationConfig = getNotificationConfig();
console.log(notificationConfig.slackWebhookUrl); // Slack webhook URL
console.log(notificationConfig.enableSlack); // true
```

## 🔧 Usage in Tests

### 1. Page Objects

```typescript
// LoginPage.ts
import { config } from "../config/environment";

export class LoginPage {
  async goto() {
    await this.page.goto(config.LOGIN_URL);
  }

  async login() {
    const testData = getTestData();
    await this.usernameInput.fill(testData.username);
    await this.passwordInput.fill(testData.password);
  }
}
```

### 2. Test Data

```typescript
// testData.ts
import { config } from "../config/environment";

export const testData = {
  credentials: {
    username: config.TEST_USERNAME,
    password: config.TEST_PASSWORD,
  },
  urls: {
    base: config.BASE_URL,
    login: config.LOGIN_URL,
  },
};
```

### 3. Playwright Configuration

```typescript
// playwright.config.ts
import { config } from "./tests/config/environment";

export default defineConfig({
  use: {
    baseURL: config.BASE_URL,
    actionTimeout: config.PLAYWRIGHT_TIMEOUT,
  },
  projects: [
    {
      name: "chromium",
      use: {
        viewport: {
          width: config.BROWSER_WIDTH,
          height: config.BROWSER_HEIGHT,
        },
      },
    },
  ],
});
```

## 🔒 Security Best Practices

### 1. Environment File Security

```bash
# Add .env to .gitignore
echo ".env" >> .gitignore

# Never commit sensitive data
git add .gitignore
git commit -m "Add .env to gitignore"
```

### 2. CI/CD Environment Variables

```yaml
# GitHub Actions
env:
  TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
  BASE_URL: ${{ secrets.BASE_URL }}
```

### 3. Docker Environment

```dockerfile
# Dockerfile
ENV NODE_ENV=production
ENV PLAYWRIGHT_HEADLESS=true

# Pass environment variables at runtime
docker run -e TEST_USERNAME=user -e TEST_PASSWORD=pass image
```

## 📈 Environment-Specific Features

### 1. Feature Flags

```bash
# Enable/disable features per environment
ENABLE_BDD_TESTS=true
ENABLE_TDD_TESTS=true
ENABLE_PERFORMANCE_TESTS=true
ENABLE_SECURITY_TESTS=true
ENABLE_ALLURE_REPORTING=true
```

### 2. Performance Thresholds

```bash
# Performance settings
PERFORMANCE_THRESHOLD=2000
LOAD_TEST_USERS=100
STRESS_TEST_DURATION=300
```

### 3. Notification Settings

```bash
# Notification configuration
ENABLE_SLACK_NOTIFICATIONS=true
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_TEAMS_NOTIFICATIONS=false
NOTIFICATION_FREQUENCY=daily
```

## 🔧 Helper Functions

### 1. Environment-Specific Data

```typescript
// Get environment-specific configuration
const devConfig = getEnvironmentSpecificData("development");
const stagingConfig = getEnvironmentSpecificData("staging");
const prodConfig = getEnvironmentSpecificData("production");
```

### 2. URL Management

```typescript
// Get all URLs
const urls = getUrls();
console.log(urls.base); // Base URL
console.log(urls.login); // Login URL
console.log(urls.dashboard); // Dashboard URL
```

### 3. Test Data Management

```typescript
// Get test credentials
const credentials = getTestData();
console.log(credentials.username);
console.log(credentials.password);
```

## 🚀 Environment Scripts

### 1. Setup Scripts

```bash
# Setup environment file
npm run env:setup

# Validate environment variables
npm run env:validate

# Run tests in specific environment
npm run env:dev
npm run env:staging
npm run env:prod
```

### 2. Docker Environment

```bash
# Run with environment variables
docker run --rm \
  -e NODE_ENV=production \
  -e BASE_URL=https://webable.pihr.xyz \
  -e TEST_USERNAME=user \
  -e TEST_PASSWORD=pass \
  pihr-playwright-tests
```

### 3. CI/CD Environment

```yaml
# GitHub Actions workflow
- name: Run tests
  env:
    NODE_ENV: staging
    BASE_URL: ${{ secrets.BASE_URL }}
    TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
    TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
  run: npm test
```

## 📊 Environment Monitoring

### 1. Environment Validation

```typescript
// Validate required environment variables
function validateEnvironment() {
  const required = ["BASE_URL", "TEST_USERNAME", "TEST_PASSWORD"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
```

### 2. Environment Logging

```typescript
// Log environment configuration
function logEnvironment() {
  console.log(`Environment: ${config.NODE_ENV}`);
  console.log(`Base URL: ${config.BASE_URL}`);
  console.log(`Browser: ${config.BROWSER_TYPE}`);
  console.log(`Headless: ${config.PLAYWRIGHT_HEADLESS}`);
}
```

## 🔧 Troubleshooting

### 1. Environment File Issues

```bash
# Check if .env file exists
ls -la .env

# Create .env file from template
cp env.example .env

# Validate environment variables
npm run env:validate
```

### 2. Missing Variables

```bash
# Check environment variables
node -e "require('dotenv').config(); console.log(process.env.BASE_URL)"

# Set environment variables
export BASE_URL=https://webable.pihr.xyz
export TEST_USERNAME=your_username
export TEST_PASSWORD=your_password
```

### 3. Environment-Specific Issues

```bash
# Run in development mode
NODE_ENV=development npm test

# Run in staging mode
NODE_ENV=staging npm test

# Run in production mode
NODE_ENV=production npm test
```

## 📚 Best Practices

### 1. Environment Management

- ✅ Use `.env` files for local development
- ✅ Use CI/CD secrets for production
- ✅ Never commit sensitive data
- ✅ Validate environment variables
- ✅ Use environment-specific configurations

### 2. Security

- ✅ Keep secrets in environment variables
- ✅ Use different credentials per environment
- ✅ Rotate credentials regularly
- ✅ Monitor for exposed secrets

### 3. Configuration

- ✅ Use type-safe configuration
- ✅ Provide default values
- ✅ Validate required variables
- ✅ Log environment information

This environment variable configuration provides a robust, secure, and flexible way to manage URLs, test data, and settings across different environments in your Playwright automation project.

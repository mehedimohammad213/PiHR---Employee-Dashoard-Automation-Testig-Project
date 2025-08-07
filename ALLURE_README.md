# Allure Reporting for Playwright

This project is configured with Allure reporting to generate beautiful, interactive HTML reports with detailed test information, screenshots, and execution traces.

## 🚀 Features

- **Interactive HTML Reports**: Beautiful, responsive web interface
- **Detailed Test Steps**: Step-by-step execution with screenshots
- **Test Metadata**: Severity, epic, feature, and story categorization
- **Attachments**: Screenshots, logs, and custom files
- **Performance Metrics**: Load times and performance data
- **Environment Information**: System and browser details
- **Trend Analysis**: Historical test execution trends

## 📦 Installation

Allure is already installed in this project:

```bash
npm install -D allure-playwright
```

## 🧪 Running Tests with Allure

### Basic Allure Test Execution

```bash
# Run tests with Allure reporter
npm run test:allure

# Run specific test file with Allure
npm run test:allure -- tests/allure-demo.spec.ts

# Run with headed browser
npm run test:allure -- --headed
```

### Generate and View Allure Reports

```bash
# Generate Allure report from results
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Serve Allure report (alternative to open)
npm run allure:serve
```

## 📊 Allure Report Features

### 1. Test Steps and Screenshots

- Each test step is captured with timestamps
- Automatic screenshots on failures
- Manual screenshots at key points
- Step-by-step execution flow

### 2. Test Metadata

```typescript
allure.description("Test description");
allure.severity("high"); // critical, high, medium, low
allure.epic("Authentication");
allure.feature("Login");
allure.story("Valid Login");
```

### 3. Test Parameters

```typescript
allure.parameter("username", "testuser");
allure.parameter("password", "***hidden***");
allure.parameter("browser", "chromium");
```

### 4. Attachments

```typescript
// Screenshots
const screenshot = await page.screenshot();
allure.attachment("screenshot.png", screenshot, "image/png");

// JSON data
allure.attachment("test-data.json", JSON.stringify(data), "application/json");

// Text files
allure.attachment("log.txt", logContent, "text/plain");
```

### 5. Performance Metrics

```typescript
const startTime = Date.now();
await page.goto("https://example.com");
const loadTime = Date.now() - startTime;
allure.attachment("load-time-ms", loadTime.toString(), "text/plain");
```

## 📁 Project Structure

```
├── tests/
│   ├── allure-demo.spec.ts           # Allure demo tests
│   ├── employee-workflow-allure.spec.ts # Enhanced workflow tests
│   └── ...
├── allure-results/                   # Allure results (auto-generated)
├── allure-report/                    # Allure reports (auto-generated)
└── screenshots/                      # Test screenshots
```

## 🎯 Allure Test Examples

### Basic Test with Steps

```typescript
import { test } from "@playwright/test";
import { allure } from "allure-playwright";

test("Basic Allure Test", async ({ page }) => {
  allure.description("A simple test with Allure reporting");
  allure.severity("high");

  allure.step("Navigate to website", async () => {
    await page.goto("https://example.com");
  });

  allure.step("Verify page title", async () => {
    await expect(page).toHaveTitle(/Example/);
  });
});
```

### Test with Attachments

```typescript
test("Test with Attachments", async ({ page }) => {
  allure.step("Take screenshot", async () => {
    await page.goto("https://example.com");
    const screenshot = await page.screenshot();
    allure.attachment("page-screenshot.png", screenshot, "image/png");
  });

  allure.step("Add test data", async () => {
    const testData = { status: "passed", timestamp: new Date() };
    allure.attachment(
      "test-data.json",
      JSON.stringify(testData),
      "application/json"
    );
  });
});
```

## 🔧 Configuration

### Playwright Configuration

The `playwright.config.ts` includes Allure reporter configuration:

```typescript
reporter: [
  ["html"],
  [
    "allure-playwright",
    {
      detail: true,
      outputFolder: "allure-results",
      suiteTitle: false,
      attachments: true,
      environmentInfo: {
        framework: "Playwright",
        language: "TypeScript",
      },
    },
  ],
];
```

### Package.json Scripts

```json
{
  "test:allure": "playwright test --reporter=allure-playwright",
  "allure:generate": "allure generate allure-results --clean",
  "allure:open": "allure open",
  "allure:serve": "allure serve allure-results"
}
```

## 📈 Report Features

### 1. Dashboard

- Test execution summary
- Pass/fail statistics
- Duration trends
- Severity distribution

### 2. Test Details

- Step-by-step execution
- Screenshots and attachments
- Error details and stack traces
- Performance metrics

### 3. Categories

- **Epics**: High-level test categories
- **Features**: Functional areas
- **Stories**: Specific test scenarios
- **Severity**: Critical, High, Medium, Low

### 4. Attachments

- Screenshots (automatic and manual)
- Log files
- JSON data
- Performance metrics
- Environment information

## 🚀 Quick Start

1. **Run tests with Allure**:

   ```bash
   npm run test:allure
   ```

2. **Generate report**:

   ```bash
   npm run allure:generate
   ```

3. **View report**:
   ```bash
   npm run allure:open
   ```

## 📊 Report Sections

### Overview

- Test execution summary
- Pass/fail ratio
- Duration statistics
- Browser distribution

### Categories

- **Epics**: Authentication, Job Card, Attendance
- **Features**: Login, Reports, Navigation
- **Stories**: Specific test scenarios
- **Severity**: Critical, High, Medium, Low

### Suites

- Test suite organization
- Grouped by test files
- Individual test details

### Timeline

- Test execution timeline
- Duration analysis
- Parallel execution view

## 🔍 Advanced Features

### Custom Attachments

```typescript
// Add custom data
allure.attachment(
  "custom-data.json",
  JSON.stringify({
    testName: "My Test",
    timestamp: new Date().toISOString(),
    customField: "value",
  }),
  "application/json"
);
```

### Environment Information

```typescript
allure.attachment(
  "environment.json",
  JSON.stringify({
    platform: process.platform,
    nodeVersion: process.version,
    playwrightVersion: "1.40.0",
    browser: "chromium",
  }),
  "application/json"
);
```

### Performance Tracking

```typescript
const startTime = Date.now();
await page.goto("https://example.com");
const loadTime = Date.now() - startTime;
allure.attachment(
  "performance.json",
  JSON.stringify({
    loadTime: loadTime,
    url: "https://example.com",
    timestamp: new Date().toISOString(),
  }),
  "application/json"
);
```

## 🐛 Troubleshooting

### Common Issues

1. **Allure results not generated**:

   - Ensure `allure-playwright` is installed
   - Check reporter configuration in `playwright.config.ts`

2. **Report not opening**:

   - Run `npm run allure:generate` first
   - Check if `allure-results` directory exists

3. **Screenshots not appearing**:
   - Verify screenshot paths in test code
   - Check file permissions

### Debug Commands

```bash
# Check Allure installation
npx allure --version

# Generate report with verbose output
npx allure generate allure-results --clean --verbose

# Serve report on specific port
npx allure serve allure-results --port 8080
```

## 📚 Resources

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Plugin](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
- [Playwright Test Reporting](https://playwright.dev/docs/test-reporters)

## 🎯 Best Practices

1. **Use descriptive step names**: Make steps clear and meaningful
2. **Add screenshots at key points**: Capture important UI states
3. **Include test metadata**: Use severity, epic, feature, story
4. **Add performance metrics**: Track load times and performance
5. **Include environment info**: Document system and browser details
6. **Use attachments wisely**: Add relevant data and logs
7. **Organize tests properly**: Use proper categorization

## 📈 Continuous Integration

### GitHub Actions Example

```yaml
- name: Run Playwright tests with Allure
  run: npm run test:allure

- name: Generate Allure report
  run: npm run allure:generate

- name: Upload Allure report
  uses: actions/upload-artifact@v2
  with:
    name: allure-report
    path: allure-report/
```

This setup provides comprehensive test reporting with beautiful, interactive HTML reports that help you understand test execution, debug failures, and track performance over time.

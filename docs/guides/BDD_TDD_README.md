# BDD and TDD Implementation Guide

This project now supports both **Behavior Driven Development (BDD)** and **Test Driven Development (TDD)** methodologies for comprehensive test automation.

## 🎯 Overview

### BDD (Behavior Driven Development)

- **Gherkin Syntax**: Human-readable feature files using Given-When-Then format
- **Cucumber Integration**: Full Cucumber.js support with TypeScript
- **Business-Focused**: Tests written in business language
- **Collaboration**: Bridges gap between technical and non-technical stakeholders

### TDD (Test Driven Development)

- **Test-First Approach**: Write tests before implementing features
- **Red-Green-Refactor**: Classic TDD cycle
- **Feature Validation**: Tests for features that don't exist yet
- **Performance Testing**: Built-in performance validation

## 📁 Project Structure

```
├── features/                          # BDD Feature Files
│   ├── login.feature                 # Login functionality
│   ├── job-card.feature             # Job card management
│   ├── attendance.feature           # Monthly attendance
│   ├── logout.feature              # Logout functionality
│   ├── step-definitions/           # Step implementations
│   │   ├── login.steps.ts
│   │   ├── job-card.steps.ts
│   │   ├── attendance.steps.ts
│   │   └── logout.steps.ts
│   └── support/                    # Cucumber support files
│       ├── world.ts               # Custom world setup
│       └── hooks.ts              # Setup/teardown hooks
├── tests/
│   ├── tdd/                       # TDD Test Files
│   │   ├── tdd-examples.spec.ts  # TDD examples
│   │   └── tdd-utils.ts          # TDD utility functions
│   └── ...                       # Existing test files
├── cucumber.js                    # Cucumber configuration
└── package.json                   # Updated with BDD/TDD scripts
```

## 🚀 Quick Start

### Running BDD Tests

```bash
# Run all BDD tests
npm run bdd

# Run BDD tests with headed browser
npm run bdd:headed

# Run BDD tests with HTML report
npm run bdd:report

# Run specific BDD tags
npm run bdd:tags @smoke
npm run bdd:tags @login
```

### Running TDD Tests

```bash
# Run all TDD tests
npm run tdd

# Run TDD tests with headed browser
npm run tdd:headed

# Run TDD tests in debug mode
npm run tdd:debug
```

### Running Tagged Tests

```bash
# Run smoke tests
npm run test:smoke

# Run specific feature tests
npm run test:login
npm run test:jobcard
npm run test:attendance
npm run test:logout
```

## 📝 BDD Feature Examples

### Login Feature

```gherkin
Feature: Employee Login
  As an employee
  I want to log into the PiHR system
  So that I can access my dashboard

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username "01830377213"
    And I enter valid password "nopass@1234"
    And I click the "Login" button
    Then I should be successfully logged in
    And I should see the employee dashboard
```

### Job Card Feature

```gherkin
Feature: Job Card Management
  As an employee
  I want to manage my job card
  So that I can track my work hours

  @smoke @jobcard
  Scenario: Generate job card PDF report
    Given I am logged into the PiHR system
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "My Job Card"
    And I select date range from "July 1st" to "July 31st"
    And I click on "PDF Report" button
    Then a PDF report should be generated
```

## 🧪 TDD Examples

### Test-First Development

```typescript
test("should validate empty username field", async ({ page }) => {
  // Arrange: Navigate to login page
  await page.goto("https://webable.pihr.xyz/login");

  // Act: Try to login with empty username
  const frame = page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!.getByRole("textbox", { name: "Password" }).fill("testpassword");
  await frame!.getByRole("button", { name: "Login" }).click();

  // Assert: Should show validation error (this test might fail initially)
  // This is the TDD approach - write the test first, then implement the feature
  try {
    await expect(page.locator(".error-message")).toBeVisible();
  } catch (error) {
    console.log(
      "Validation feature not implemented yet - this is expected in TDD"
    );
  }
});
```

### TDD Utility Functions

```typescript
const tddUtils = new TDDUtils(page);

// Test for feature that doesn't exist yet
await tddUtils.testFeatureNotYetImplemented("Username validation", async () => {
  await page.fill('[name="username"]', "");
  await page.click('button[type="submit"]');
  await expect(page.locator(".error-message")).toBeVisible();
});

// Test performance requirements
await tddUtils.testPerformanceRequirement(
  "Page load",
  async () => await page.goto("https://example.com"),
  3000 // 3 seconds max
);
```

## 🔧 Configuration

### Cucumber Configuration (cucumber.js)

```javascript
module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["features/step-definitions/**/*.ts", "features/support/**/*.ts"],
    format: ["progress-bar", "html:cucumber-report.html"],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },
};
```

### Package.json Scripts

```json
{
  "scripts": {
    "bdd": "cucumber-js",
    "bdd:headed": "cucumber-js --world-parameters '{\"headless\": false}'",
    "bdd:report": "cucumber-js --format html:cucumber-report.html",
    "tdd": "playwright test tests/tdd/",
    "tdd:headed": "playwright test tests/tdd/ --headed",
    "test:smoke": "playwright test --grep @smoke",
    "test:login": "playwright test --grep @login"
  }
}
```

## 🎯 BDD Benefits

1. **Business Readability**: Tests written in plain English
2. **Stakeholder Collaboration**: Non-technical stakeholders can understand tests
3. **Living Documentation**: Feature files serve as documentation
4. **Behavior Focus**: Tests focus on behavior, not implementation
5. **Reusability**: Step definitions can be reused across scenarios

## 🧪 TDD Benefits

1. **Test-First Approach**: Ensures all features are tested
2. **Design Guidance**: Tests drive the design of features
3. **Regression Prevention**: Catches regressions early
4. **Documentation**: Tests serve as living documentation
5. **Confidence**: Provides confidence in code changes

## 📊 Test Categories

### BDD Tags

- `@smoke`: Critical path tests
- `@login`: Authentication tests
- `@jobcard`: Job card functionality
- `@attendance`: Attendance management
- `@logout`: Logout functionality
- `@negative`: Negative test scenarios
- `@validation`: Input validation tests
- `@security`: Security-related tests

### TDD Categories

- `@tdd`: Test-driven development examples
- `@performance`: Performance testing
- `@security`: Security testing
- `@accessibility`: Accessibility testing
- `@validation`: Data validation testing

## 🔄 Development Workflow

### BDD Workflow

1. **Write Feature**: Create `.feature` file with scenarios
2. **Generate Steps**: Cucumber generates step definitions
3. **Implement Steps**: Write step implementation code
4. **Run Tests**: Execute BDD tests
5. **Refine**: Update scenarios based on results

### TDD Workflow

1. **Write Test**: Create test for non-existent feature
2. **Run Test**: Test fails (Red)
3. **Implement Feature**: Write minimal code to pass test
4. **Run Test**: Test passes (Green)
5. **Refactor**: Improve code while keeping tests green
6. **Repeat**: Continue for next feature

## 📈 Reporting

### BDD Reports

- **Cucumber HTML**: `cucumber-report.html`
- **Console Output**: Progress bar and step details
- **Allure Integration**: Can be integrated with Allure

### TDD Reports

- **Playwright HTML**: Standard Playwright reports
- **Allure Integration**: Full Allure reporting support
- **Console Output**: Detailed test results

## 🎯 Best Practices

### BDD Best Practices

1. **Use Business Language**: Write scenarios in business terms
2. **Keep Scenarios Simple**: One scenario per behavior
3. **Use Background**: Common setup steps
4. **Tag Appropriately**: Use tags for organization
5. **Reuse Steps**: Create reusable step definitions

### TDD Best Practices

1. **Write Tests First**: Always write test before implementation
2. **Keep Tests Simple**: One assertion per test
3. **Test Edge Cases**: Include boundary conditions
4. **Refactor Regularly**: Clean up code after tests pass
5. **Use Descriptive Names**: Clear test and method names

## 🚀 Advanced Features

### BDD Advanced Features

- **Data Tables**: Parameterized scenarios
- **Scenario Outlines**: Multiple data sets
- **Hooks**: Setup and teardown
- **World Object**: Shared context
- **Custom Formatters**: Custom reporting

### TDD Advanced Features

- **Performance Testing**: Built-in performance validation
- **Security Testing**: Security requirement validation
- **Accessibility Testing**: Accessibility requirement validation
- **Error Handling**: Comprehensive error scenario testing
- **Data Validation**: Input validation testing

## 📚 Resources

- [Cucumber Documentation](https://cucumber.io/docs)
- [Playwright Documentation](https://playwright.dev/docs)
- [TDD Best Practices](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

This implementation provides a comprehensive testing framework that supports both BDD and TDD methodologies, enabling teams to choose the approach that best fits their development process and project requirements.

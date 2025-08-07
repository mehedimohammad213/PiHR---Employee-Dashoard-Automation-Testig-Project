# Page Object Model (POM) Test Implementation

This directory contains a comprehensive test automation framework using the Page Object Model pattern for the employee workflow application.

## 📁 Directory Structure

```
tests/
├── pages/                    # Page Object Model classes
│   ├── LoginPage.ts         # Login page interactions
│   ├── DashboardPage.ts     # Dashboard navigation
│   ├── JobCardPage.ts       # Job card functionality
│   └── MonthlyAttendancePage.ts # Monthly attendance
├── data/                    # Test data and selectors
│   └── testData.ts         # Credentials and test data
├── utils/                   # Utility classes
│   ├── TestUtils.ts        # Common test utilities
│   └── test-helpers.ts     # Legacy helper functions
├── employee-workflow.spec.ts # Main test file
└── README.md               # This file
```

## 🏗️ Page Object Model Classes

### LoginPage
- Handles iframe-based login form
- Manages username, password, and remember me functionality
- Provides login verification methods

### DashboardPage
- Manages navigation between different sections
- Handles menu interactions (Employee, Self Service, My Screens)
- Provides logout functionality

### JobCardPage
- Manages job card date selection
- Handles PDF report generation
- Manages Excel export functionality

### MonthlyAttendancePage
- Manages monthly attendance report generation
- Handles month selection
- Provides PDF report generation

## 📊 Test Data Management

The `testData.ts` file contains:
- User credentials
- Date ranges for reports
- Month selections
- Navigation menu items
- CSS selectors for elements

## 🧪 Test Scenarios

### 1. Complete Employee Workflow
- Login with valid credentials
- Navigate through Employee → Self Service
- Access My Job Card with date selection
- Generate PDF and Excel reports
- Access Monthly Attendance
- Generate monthly attendance report
- Navigate to Dashboard
- Logout successfully

### 2. Invalid Login Test
- Attempt login with invalid credentials
- Verify login failure

### 3. Job Card Report Generation
- Login and navigate to job card
- Select date range
- Generate PDF and Excel reports

### 4. Monthly Attendance Report
- Login and navigate to monthly attendance
- Select month
- Generate PDF report

## 🛠️ Usage Examples

### Basic Page Object Usage
```typescript
import { LoginPage } from './pages/LoginPage';
import { testData } from './data/testData';

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login(testData.credentials.username, testData.credentials.password);
```

### Using Test Utils
```typescript
import { TestUtils } from './utils/TestUtils';

const utils = new TestUtils(page);
await utils.waitForPageLoad();
await utils.takeScreenshot('test-step');
```

## 🔧 Configuration

### Test Data
Update `tests/data/testData.ts` to modify:
- User credentials
- Date ranges
- Month selections
- Navigation paths

### Page Objects
Each page object can be extended with:
- Additional element locators
- New interaction methods
- Custom verification methods

## 🚀 Running Tests

```bash
# Run all employee workflow tests
npm test tests/employee-workflow.spec.ts

# Run specific test
npm test -- --grep "Complete Employee Workflow"

# Run with headed browser
npm run test:headed tests/employee-workflow.spec.ts
```

## 📈 Benefits of POM Implementation

1. **Maintainability**: Centralized element locators
2. **Reusability**: Page objects can be reused across tests
3. **Readability**: Test code is more readable and self-documenting
4. **Scalability**: Easy to add new pages and functionality
5. **Reliability**: Consistent element interactions

## 🔍 Best Practices

1. **Single Responsibility**: Each page object handles one page
2. **Encapsulation**: Hide implementation details from test code
3. **Consistent Naming**: Use descriptive method names
4. **Error Handling**: Include proper error handling in page objects
5. **Documentation**: Document complex interactions

## 🐛 Debugging

### Screenshots
Tests automatically take screenshots on failure:
```typescript
await utils.takeScreenshot('login-step');
```

### Retry Logic
Use retry mechanism for flaky elements:
```typescript
await utils.retryAction(async () => {
  await element.click();
});
```

### Wait Strategies
Use appropriate wait strategies:
```typescript
await utils.waitForPageLoad();
await utils.waitForElement('selector');
```

## 📝 Adding New Tests

1. **Create Page Object**: Add new page class in `pages/` directory
2. **Add Test Data**: Update `testData.ts` with new selectors
3. **Write Test**: Create test in spec file
4. **Add Utilities**: Extend `TestUtils` if needed

## 🔄 Maintenance

- Update selectors when UI changes
- Refresh test data when credentials change
- Add new page objects for new features
- Maintain consistent naming conventions

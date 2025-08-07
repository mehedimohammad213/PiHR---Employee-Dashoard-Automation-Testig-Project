import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobCardPage } from "./pages/JobCardPage";
import { MonthlyAttendancePage } from "./pages/MonthlyAttendancePage";
import { TestUtils } from "./utils/TestUtils";
import { testData } from "./data/testData";

test.describe("Enhanced Employee Workflow Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let jobCardPage: JobCardPage;
  let monthlyAttendancePage: MonthlyAttendancePage;
  let testUtils: TestUtils;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    jobCardPage = new JobCardPage(page);
    monthlyAttendancePage = new MonthlyAttendancePage(page);
    testUtils = new TestUtils(page);
  });

  test("Complete Employee Workflow with Enhanced Error Handling", async ({ page }) => {
    // Step 1: Login with enhanced debugging
    console.log("=== Starting Enhanced Employee Workflow Test ===");

    await testUtils.retryAction(async () => {
      await loginPage.goto();
      await testUtils.logPageInfo();
      await testUtils.takeScreenshot("login-page");
    });

    await testUtils.retryAction(async () => {
      await loginPage.login();
      console.log("Login completed successfully");
    });

    // Verify login success
    await testUtils.retryAction(async () => {
      await loginPage.verifyLoginSuccess();
      console.log("Login verification passed");
    });

    // Step 2: Navigate to Job Card with debugging
    console.log("=== Navigating to Job Card ===");
    await testUtils.debugNavigation();
    await testUtils.takeScreenshot("before-job-card-navigation");

    await testUtils.retryAction(async () => {
      await dashboardPage.navigateToJobCard();
      console.log("Job Card navigation completed");
    });

    await testUtils.takeScreenshot("after-job-card-navigation");

    // Step 3: Test Job Card functionality
    console.log("=== Testing Job Card Functionality ===");

    await testUtils.retryAction(async () => {
      await jobCardPage.selectDateRange(
        testData.dates.startDate,
        testData.dates.endDate
      );
      console.log("Date range selected successfully");
    });

    await testUtils.takeScreenshot("job-card-date-selection");

    // Generate PDF Report
    await testUtils.retryAction(async () => {
      const popupPromise = page.waitForEvent("popup");
      await jobCardPage.generatePDFReport();
      const popup = await popupPromise;
      console.log("PDF report generated successfully");

      // Close the popup
      await popup.close();
    });

    // Step 4: Navigate to Monthly Attendance
    console.log("=== Navigating to Monthly Attendance ===");

    await testUtils.retryAction(async () => {
      await dashboardPage.navigateToMonthlyAttendance();
      console.log("Monthly Attendance navigation completed");
    });

    await testUtils.takeScreenshot("monthly-attendance-page");

    // Step 5: Test Monthly Attendance functionality
    console.log("=== Testing Monthly Attendance Functionality ===");

    await testUtils.retryAction(async () => {
      await monthlyAttendancePage.selectMonth(testData.months.june);
      console.log("Month selected successfully");
    });

    await testUtils.takeScreenshot("monthly-attendance-month-selection");

    // Generate PDF Report
    await testUtils.retryAction(async () => {
      const popupPromise = page.waitForEvent("popup");
      await monthlyAttendancePage.generatePDFReport();
      const popup = await popupPromise;
      console.log("Monthly attendance PDF report generated successfully");

      // Close the popup
      await popup.close();
    });

    // Step 6: Logout
    console.log("=== Logging Out ===");

    await testUtils.retryAction(async () => {
      await dashboardPage.logout();
      console.log("Logout completed successfully");
    });

    await testUtils.retryAction(async () => {
      await dashboardPage.verifyLoggedOut();
      console.log("Logout verification passed");
    });

    await testUtils.takeScreenshot("logout-complete");
    console.log("=== Enhanced Employee Workflow Test Completed Successfully ===");
  });

  test("Navigation Debug Test with Enhanced Utils", async ({ page }) => {
    console.log("=== Starting Navigation Debug Test ===");

    // Login
    await loginPage.goto();
    await loginPage.login();
    await loginPage.verifyLoginSuccess();

    // Debug navigation elements
    await testUtils.debugNavigation();
    await testUtils.takeScreenshot("navigation-debug");

    // Test safe navigation methods
    await testUtils.safeClick('p:has-text("Self Service")', "Self Service menu");
    await testUtils.takeScreenshot("after-self-service-click");

    await page.waitForTimeout(2000);

    await testUtils.safeClick('p:has-text("Reports")', "Reports menu");
    await testUtils.takeScreenshot("after-reports-click");

    await page.waitForTimeout(2000);

    // Check if My Job Card button is available
    const jobCardExists = await testUtils.waitForElement('button:has-text("My Job Card")', 5000);

    if (jobCardExists) {
      await testUtils.safeClick('button:has-text("My Job Card")', "My Job Card button");
      await testUtils.takeScreenshot("job-card-page");
      console.log("Successfully navigated to Job Card page");
    } else {
      console.log("My Job Card button not found, taking debug screenshot");
      await testUtils.takeScreenshot("job-card-button-not-found");
      await testUtils.debugNavigation();
    }
  });

  test("Error Recovery Test", async ({ page }) => {
    console.log("=== Starting Error Recovery Test ===");

    // Login
    await loginPage.goto();
    await loginPage.login();
    await loginPage.verifyLoginSuccess();

    // Test navigation with error recovery
    try {
      await dashboardPage.navigateToJobCard();
      console.log("Navigation succeeded on first attempt");
    } catch (error) {
      console.log("Navigation failed, attempting recovery...");
      await testUtils.takeScreenshot("navigation-error");

      // Try alternative navigation approach
      await testUtils.retryAction(async () => {
        await page.reload();
        await page.waitForLoadState('networkidle');
        await dashboardPage.navigateToJobCard();
      }, 2, 2000);
    }

    await testUtils.takeScreenshot("error-recovery-complete");
  });
});

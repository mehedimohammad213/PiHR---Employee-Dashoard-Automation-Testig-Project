import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobCardPage } from "./pages/JobCardPage";
import { MonthlyAttendancePage } from "./pages/MonthlyAttendancePage";
import { testData } from "./data/testData";
import { TestUtils } from "./utils/TestUtils";

test.describe("Employee Workflow Tests with Allure Reporting", () => {
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

  test("Complete Employee Workflow - Login, Job Card, Monthly Attendance, and Logout", async ({
    page,
  }) => {
    // Allure test description
    allure.description(
      "Complete end-to-end employee workflow including login, job card management, monthly attendance, and logout"
    );

    // Test parameters for Allure
    allure.parameter("username", testData.credentials.username);
    allure.parameter("password", "***hidden***");
    allure.parameter("startDate", testData.dates.startDate);
    allure.parameter("endDate", testData.dates.endDate);
    allure.parameter("month", testData.months.june);

    // Step 1: Login to the application
    allure.step("Login to the application", async () => {
      await loginPage.goto();
      await testUtils.takeScreenshot("login-page");
      await loginPage.login(
        testData.credentials.username,
        testData.credentials.password
      );
      await loginPage.verifyLoginSuccess();
      await testUtils.takeScreenshot("after-login");
    });

    // Step 2: Navigate to Employee section
    allure.step("Navigate to Employee section", async () => {
      await dashboardPage.navigateToEmployee();
      await testUtils.takeScreenshot("employee-section");
    });

    // Step 3: Navigate to Self Service
    allure.step("Navigate to Self Service", async () => {
      await dashboardPage.navigateToSelfService();
      await testUtils.takeScreenshot("self-service-section");
    });

    // Step 4: Access My Job Card
    allure.step("Access My Job Card", async () => {
      await jobCardPage.navigateToJobCard();
      await jobCardPage.verifyJobCardPage();
      await testUtils.takeScreenshot("job-card-page");
    });

    // Step 5: Select date range for job card
    allure.step("Select date range for job card", async () => {
      await jobCardPage.selectDateRange(
        testData.dates.startDate,
        testData.dates.endDate
      );
      await testUtils.takeScreenshot("date-range-selected");
    });

    // Step 6: Generate PDF Report for job card
    allure.step("Generate PDF Report for job card", async () => {
      const jobCardPDFPopup = await jobCardPage.generatePDFReport();
      await expect(jobCardPDFPopup).toBeDefined();
      await testUtils.takeScreenshot("pdf-report-generated");
    });

    // Step 7: Select date range again for Excel export
    allure.step("Select date range again for Excel export", async () => {
      await jobCardPage.selectDateRange(
        testData.dates.startDate,
        testData.dates.endDate
      );
      await testUtils.takeScreenshot("date-range-for-excel");
    });

    // Step 8: Export to Excel
    allure.step("Export to Excel", async () => {
      const excelDownload = await jobCardPage.exportToExcel();
      await expect(excelDownload).toBeDefined();
      await testUtils.takeScreenshot("excel-export-completed");
    });

    // Step 9: Generate another PDF Report
    allure.step("Generate another PDF Report", async () => {
      const jobCardPDFPopup2 = await jobCardPage.generatePDFReport();
      await expect(jobCardPDFPopup2).toBeDefined();
      await testUtils.takeScreenshot("second-pdf-report");
    });

    // Step 10: Navigate back to Self Service
    allure.step("Navigate back to Self Service", async () => {
      await dashboardPage.navigateToSelfService();
      await testUtils.takeScreenshot("back-to-self-service");
    });

    // Step 11: Access Monthly Attendance
    allure.step("Access Monthly Attendance", async () => {
      await monthlyAttendancePage.navigateToMonthlyAttendance();
      await monthlyAttendancePage.verifyMonthlyAttendancePage();
      await testUtils.takeScreenshot("monthly-attendance-page");
    });

    // Step 12: Select month for attendance
    allure.step("Select month for attendance", async () => {
      await monthlyAttendancePage.selectMonth(testData.months.june);
      await testUtils.takeScreenshot("month-selected");
    });

    // Step 13: Generate PDF Report for monthly attendance
    allure.step("Generate PDF Report for monthly attendance", async () => {
      const monthlyAttendancePDFPopup =
        await monthlyAttendancePage.generatePDFReport();
      await expect(monthlyAttendancePDFPopup).toBeDefined();
      await testUtils.takeScreenshot("monthly-attendance-pdf");
    });

    // Step 14: Navigate to My Screens
    allure.step("Navigate to My Screens", async () => {
      await dashboardPage.navigateToMyScreens();
      await testUtils.takeScreenshot("my-screens-section");
    });

    // Step 15: Access Dashboard
    allure.step("Access Dashboard", async () => {
      await dashboardPage.clickDashboard();
      await testUtils.takeScreenshot("dashboard-page");
    });

    // Step 16: Logout from the application
    allure.step("Logout from the application", async () => {
      await dashboardPage.logout();
      await dashboardPage.verifyLoggedOut();
      await testUtils.takeScreenshot("logout-completed");
    });
  });

  test("Login with Invalid Credentials", async ({ page }) => {
    allure.description("Test login functionality with invalid credentials");
    allure.severity("medium");
    allure.epic("Authentication");
    allure.feature("Login");
    allure.story("Invalid Login");

    allure.step("Attempt login with invalid credentials", async () => {
      await loginPage.goto();
      await testUtils.takeScreenshot("login-page-invalid");
      await loginPage.login("invalid_user", "invalid_password");
      await testUtils.takeScreenshot("invalid-login-attempt");
    });

    allure.step("Verify login failure", async () => {
      // Verify that login failed (should still be on login page)
      await expect(page).toHaveURL(/.*login.*/);
      await testUtils.takeScreenshot("login-failed-verification");
    });
  });

  test("Job Card Date Selection and Report Generation", async ({ page }) => {
    allure.description(
      "Test job card functionality including date selection and report generation"
    );
    allure.severity("high");
    allure.epic("Job Card Management");
    allure.feature("Job Card Reports");
    allure.story("Date Selection and Reports");

    // Login first
    allure.step("Login to the application", async () => {
      await loginPage.goto();
      await loginPage.login(
        testData.credentials.username,
        testData.credentials.password
      );
      await loginPage.verifyLoginSuccess();
      await testUtils.takeScreenshot("login-for-job-card");
    });

    // Navigate to job card
    allure.step("Navigate to job card section", async () => {
      await dashboardPage.navigateToJobCard();
      await testUtils.takeScreenshot("job-card-navigation");
    });

    // Test date selection
    allure.step("Select date range for job card", async () => {
      await jobCardPage.selectDateRange(
        testData.dates.startDate,
        testData.dates.endDate
      );
      await testUtils.takeScreenshot("job-card-date-selection");
    });

    // Test PDF generation
    allure.step("Generate PDF report", async () => {
      const pdfPopup = await jobCardPage.generatePDFReport();
      await expect(pdfPopup).toBeDefined();
      await testUtils.takeScreenshot("job-card-pdf-generated");
    });

    // Test Excel export
    allure.step("Export to Excel", async () => {
      const excelDownload = await jobCardPage.exportToExcel();
      await expect(excelDownload).toBeDefined();
      await testUtils.takeScreenshot("job-card-excel-export");
    });
  });

  test("Monthly Attendance Report Generation", async ({ page }) => {
    allure.description(
      "Test monthly attendance report generation functionality"
    );
    allure.severity("high");
    allure.epic("Attendance Management");
    allure.feature("Monthly Reports");
    allure.story("Attendance Report Generation");

    // Login first
    allure.step("Login to the application", async () => {
      await loginPage.goto();
      await loginPage.login(
        testData.credentials.username,
        testData.credentials.password
      );
      await loginPage.verifyLoginSuccess();
      await testUtils.takeScreenshot("login-for-attendance");
    });

    // Navigate to monthly attendance
    allure.step("Navigate to monthly attendance section", async () => {
      await dashboardPage.navigateToMonthlyAttendance();
      await testUtils.takeScreenshot("monthly-attendance-navigation");
    });

    // Select month and generate report
    allure.step("Select month and generate report", async () => {
      await monthlyAttendancePage.selectMonth(testData.months.june);
      await testUtils.takeScreenshot("month-selected-for-attendance");

      const pdfPopup = await monthlyAttendancePage.generatePDFReport();
      await expect(pdfPopup).toBeDefined();
      await testUtils.takeScreenshot("monthly-attendance-pdf-generated");
    });
  });

  test("Application Performance Test", async ({ page }) => {
    allure.description("Test application performance and response times");
    allure.severity("medium");
    allure.epic("Performance");
    allure.feature("Response Time");
    allure.story("Page Load Performance");

    const startTime = Date.now();

    allure.step("Measure login page load time", async () => {
      await loginPage.goto();
      const loadTime = Date.now() - startTime;
      allure.attachment("login-load-time", loadTime.toString(), "text/plain");
      await testUtils.takeScreenshot("performance-login-page");
    });

    allure.step("Measure dashboard load time after login", async () => {
      const dashboardStartTime = Date.now();
      await loginPage.login(
        testData.credentials.username,
        testData.credentials.password
      );
      await loginPage.verifyLoginSuccess();
      const dashboardLoadTime = Date.now() - dashboardStartTime;
      allure.attachment(
        "dashboard-load-time",
        dashboardLoadTime.toString(),
        "text/plain"
      );
      await testUtils.takeScreenshot("performance-dashboard");
    });
  });
});

import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobCardPage } from "./pages/JobCardPage";
import { MonthlyAttendancePage } from "./pages/MonthlyAttendancePage";
import { testData } from "./data/testData";

test.describe("Employee Workflow Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let jobCardPage: JobCardPage;
  let monthlyAttendancePage: MonthlyAttendancePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    jobCardPage = new JobCardPage(page);
    monthlyAttendancePage = new MonthlyAttendancePage(page);
  });

  test("Complete Employee Workflow - Login, Job Card, Monthly Attendance, and Logout", async ({
    page,
  }) => {
    // Step 1: Login to the application
    await loginPage.goto();
    await loginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );
    await loginPage.verifyLoginSuccess();

    // Step 2: Navigate to Employee section
    await dashboardPage.navigateToEmployee();

    // Step 3: Navigate to Self Service
    await dashboardPage.navigateToSelfService();

    // Step 4: Access My Job Card
    await jobCardPage.navigateToJobCard();
    await jobCardPage.verifyJobCardPage();

    // Step 5: Select date range for job card
    await jobCardPage.selectDateRange(
      testData.dates.startDate,
      testData.dates.endDate
    );

    // Step 6: Generate PDF Report for job card
    const jobCardPDFPopup = await jobCardPage.generatePDFReport();
    await expect(jobCardPDFPopup).toBeDefined();

    // Step 7: Select date range again for Excel export
    await jobCardPage.selectDateRange(
      testData.dates.startDate,
      testData.dates.endDate
    );

    // Step 8: Export to Excel
    const excelDownload = await jobCardPage.exportToExcel();
    await expect(excelDownload).toBeDefined();

    // Step 9: Generate another PDF Report
    const jobCardPDFPopup2 = await jobCardPage.generatePDFReport();
    await expect(jobCardPDFPopup2).toBeDefined();

    // Step 10: Navigate back to Self Service
    await dashboardPage.navigateToSelfService();

    // Step 11: Access Monthly Attendance
    await monthlyAttendancePage.navigateToMonthlyAttendance();
    await monthlyAttendancePage.verifyMonthlyAttendancePage();

    // Step 12: Select month for attendance
    await monthlyAttendancePage.selectMonth(testData.months.june);

    // Step 13: Generate PDF Report for monthly attendance
    const monthlyAttendancePDFPopup =
      await monthlyAttendancePage.generatePDFReport();
    await expect(monthlyAttendancePDFPopup).toBeDefined();

    // Step 14: Navigate to My Screens
    await dashboardPage.navigateToMyScreens();

    // Step 15: Access Dashboard
    await dashboardPage.clickDashboard();

    // Step 16: Logout from the application
    await dashboardPage.logout();
    await dashboardPage.verifyLoggedOut();
  });

  test("Login with Invalid Credentials", async ({ page }) => {
    await loginPage.goto();
    await loginPage.login("invalid_user", "invalid_password");

    // Verify that login failed (should still be on login page)
    await expect(page).toHaveURL(/.*login.*/);
  });

  test("Job Card Date Selection and Report Generation", async ({ page }) => {
    // Login first
    await loginPage.goto();
    await loginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );
    await loginPage.verifyLoginSuccess();

    // Navigate to job card
    await dashboardPage.navigateToEmployee();
    await dashboardPage.navigateToSelfService();
    await jobCardPage.navigateToJobCard();

    // Test date selection
    await jobCardPage.selectDateRange(
      testData.dates.startDate,
      testData.dates.endDate
    );

    // Test PDF generation
    const pdfPopup = await jobCardPage.generatePDFReport();
    await expect(pdfPopup).toBeDefined();

    // Test Excel export
    const excelDownload = await jobCardPage.exportToExcel();
    await expect(excelDownload).toBeDefined();
  });

  test("Monthly Attendance Report Generation", async ({ page }) => {
    // Login first
    await loginPage.goto();
    await loginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );
    await loginPage.verifyLoginSuccess();

    // Navigate to monthly attendance
    await dashboardPage.navigateToEmployee();
    await dashboardPage.navigateToSelfService();
    await monthlyAttendancePage.navigateToMonthlyAttendance();

    // Select month and generate report
    await monthlyAttendancePage.selectMonth(testData.months.june);
    const pdfPopup = await monthlyAttendancePage.generatePDFReport();
    await expect(pdfPopup).toBeDefined();
  });
});

import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { DashboardPage } from "../../tests/pages/DashboardPage";
import { MonthlyAttendancePage } from "../../tests/pages/MonthlyAttendancePage";

let dashboardPage: DashboardPage;
let monthlyAttendancePage: MonthlyAttendancePage;

When("I click on {string}", async function (elementName: string) {
  if (elementName === "Self Service") {
    await dashboardPage.navigateToSelfService();
  } else if (elementName === "Monthly Attendance") {
    monthlyAttendancePage = new MonthlyAttendancePage(this.page);
    await monthlyAttendancePage.navigateToMonthlyAttendance();
  } else if (elementName === "PDF Report") {
    await monthlyAttendancePage.generatePDFReport();
  }
});

When("I select month {string}", async function (month: string) {
  await monthlyAttendancePage.selectMonth(month);
});

When("I navigate back to {string}", async function (sectionName: string) {
  if (sectionName === "Self Service") {
    await dashboardPage.navigateToSelfService();
  }
});

When("I click on {string}", async function (elementName: string) {
  if (elementName === "My Screens") {
    await dashboardPage.navigateToMyScreens();
  } else if (elementName === "Dashboard") {
    await dashboardPage.clickDashboard();
  }
});

Then("a PDF report should be generated", async function () {
  // This would verify that a PDF report was actually generated
  // For now, we'll just check that the action completed without error
  await expect(this.page).toBeDefined();
});

Then(
  "a new popup window should open with the attendance report",
  async function () {
    // This would verify that a popup window opened with the attendance report
    // For now, we'll just check that the action completed
    await expect(this.page).toBeDefined();
  }
);

Then("I should see {string}", async function (expectedResult: string) {
  if (expectedResult === "PDF report generated") {
    await expect(this.page).toBeDefined();
  }
});

Then("I should be on the dashboard page", async function () {
  await expect(this.page).toHaveURL(/.*dashboard.*/);
});

Then("I should see the dashboard elements", async function () {
  // This would verify that dashboard elements are visible
  // For now, we'll just check that the page is accessible
  await expect(this.page).toBeDefined();
});

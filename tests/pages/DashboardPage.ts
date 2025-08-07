import { Page, Locator, expect } from "@playwright/test";
import { config } from "../config/environment";

export class DashboardPage {
  readonly page: Page;
  readonly employeeMenu: Locator;
  readonly selfServiceMenu: Locator;
  readonly myJobCardButton: Locator;
  readonly monthlyAttendanceButton: Locator;
  readonly myScreensMenu: Locator;
  readonly dashboardButton: Locator;
  readonly profileImage: Locator;
  readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeMenu = page
      .getByRole("paragraph")
      .filter({ hasText: "Employee" })
      .locator("span");
    this.selfServiceMenu = page
      .getByRole("paragraph")
      .filter({ hasText: "Self Service" })
      .locator("span");
    this.myJobCardButton = page.getByRole("button", { name: "My Job Card" });
    this.monthlyAttendanceButton = page.getByRole("button", {
      name: "Monthly Attendance",
      exact: true,
    });
    this.myScreensMenu = page
      .getByRole("paragraph")
      .filter({ hasText: "My Screens" });
    this.dashboardButton = page.getByRole("button", { name: "Dashboard" });
    this.profileImage = page.getByRole("img", { name: "profile", exact: true });
    this.logoutMenuItem = page.getByRole("menuitem", { name: "Logout" });
  }

  async goto() {
    await this.page.goto(config.DASHBOARD_URL);
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToJobCard() {
    await this.employeeMenu.click();
    await this.selfServiceMenu.click();
    await this.myJobCardButton.click();

    // Wait for navigation to job card page
    await this.page.waitForURL("**/job-card**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });
  }

  async navigateToMonthlyAttendance() {
    await this.employeeMenu.click();
    await this.selfServiceMenu.click();
    await this.monthlyAttendanceButton.click();

    // Wait for navigation to attendance page
    await this.page.waitForURL("**/attendance**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });
  }

  async navigateToDashboard() {
    await this.myScreensMenu.click();
    await this.dashboardButton.click();

    // Wait for navigation back to dashboard
    await this.page.waitForURL("**/dashboard**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });
  }

  async logout() {
    await this.profileImage.click();
    await this.logoutMenuItem.click();

    // Wait for logout to complete
    await this.page.waitForURL("**/login**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/.*dashboard/);
    await expect(this.employeeMenu).toBeVisible();
    await expect(this.selfServiceMenu).toBeVisible();
  }

  async verifyLoggedOut() {
    await expect(this.page).toHaveURL(/.*login/);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async isOnDashboard(): Promise<boolean> {
    try {
      await this.page.waitForURL("**/dashboard**", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

import { Page, Locator, expect } from "@playwright/test";
import { config } from "../config/environment";

export class DashboardPage {
  readonly page: Page;
  readonly selfServiceMenu: Locator;
  readonly reportsMenu: Locator;
  readonly myJobCardButton: Locator;
  readonly monthlyAttendanceButton: Locator;
  readonly myScreensMenu: Locator;
  readonly dashboardButton: Locator;
  readonly profileImage: Locator;
  readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selfServiceMenu = page.locator('p:has-text("Self Service")');
    this.reportsMenu = page.locator('p:has-text("Reports")');
    this.myJobCardButton = page.locator('button:has-text("My Job Card")');
    this.monthlyAttendanceButton = page.locator('button:has-text("Monthly Attendance")');
    this.myScreensMenu = page.locator('p:has-text("My Screens")');
    this.dashboardButton = page.locator('button:has-text("Dashboard")');
    this.profileImage = page.locator('img[name="profile"]');
    this.logoutMenuItem = page.locator('menuitem[name="Logout"]');
  }

  async goto() {
    await this.page.goto(config.DASHBOARD_URL);
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToJobCard() {
    try {
      // Wait for page to fully load
      await this.page.waitForTimeout(3000);

      // Click Self Service with retry
      await this.retryClick(this.selfServiceMenu, "Self Service");
      await this.page.waitForTimeout(2000);

      // Double click Reports with retry
      await this.retryClick(this.reportsMenu, "Reports", true);
      await this.page.waitForTimeout(2000);

      // Click My Job Card with retry
      await this.retryClick(this.myJobCardButton, "My Job Card");

      // Wait for navigation to job card page
      await this.page.waitForURL("**/job-card**", {
        timeout: config.PLAYWRIGHT_TIMEOUT,
      });
    } catch (error) {
      console.error("Failed to navigate to Job Card:", error);
      throw error;
    }
  }

  async navigateToMonthlyAttendance() {
    try {
      // Wait for page to fully load
      await this.page.waitForTimeout(3000);

      // Click Self Service with retry
      await this.retryClick(this.selfServiceMenu, "Self Service");
      await this.page.waitForTimeout(2000);

      // Double click Reports with retry
      await this.retryClick(this.reportsMenu, "Reports", true);
      await this.page.waitForTimeout(2000);

      // Click Monthly Attendance with retry
      await this.retryClick(this.monthlyAttendanceButton, "Monthly Attendance");

      // Wait for navigation to attendance page
      await this.page.waitForURL("**/attendance**", {
        timeout: config.PLAYWRIGHT_TIMEOUT,
      });
    } catch (error) {
      console.error("Failed to navigate to Monthly Attendance:", error);
      throw error;
    }
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
    await expect(this.page).toHaveURL(/.*employee/);
    await expect(this.selfServiceMenu).toBeVisible();
    await expect(this.reportsMenu).toBeVisible();
  }

  async verifyLoggedOut() {
    await expect(this.page).toHaveURL(/.*login/);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async isOnDashboard(): Promise<boolean> {
    try {
      await this.page.waitForURL("**/employee/**", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // Helper method for retry logic
  private async retryClick(locator: Locator, elementName: string, doubleClick: boolean = false, maxRetries: number = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await locator.waitFor({ state: 'visible', timeout: 5000 });

        if (doubleClick) {
          await locator.dblclick();
        } else {
          await locator.click();
        }

        console.log(`Successfully clicked ${elementName} on attempt ${attempt}`);
        return;
      } catch (error) {
        console.log(`Attempt ${attempt} failed for ${elementName}:`, error);

        if (attempt === maxRetries) {
          throw new Error(`Failed to click ${elementName} after ${maxRetries} attempts`);
        }

        // Wait before retry
        await this.page.waitForTimeout(1000);
      }
    }
  }
}

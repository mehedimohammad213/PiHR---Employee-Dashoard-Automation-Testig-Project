import { Page, Locator, expect } from "@playwright/test";
import { config } from "../../../core/config/environment";

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
    this.monthlyAttendanceButton = page.locator('button:has-text("Monthly Attendance"):not(:has-text("Subordinate"))');
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
      // Wait for page to fully load and stabilize
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(2000);

      // First, try to expand the Employee menu if it exists
      const employeeMenu = this.page.locator('p:has-text("Employee")');
      if (await employeeMenu.isVisible()) {
        await employeeMenu.click();
        await this.page.waitForTimeout(1000);
      }

      // Wait for Self Service to be visible and clickable
      await this.page.waitForSelector('p:has-text("Self Service")', { state: 'visible', timeout: 10000 });
      await this.selfServiceMenu.click();
      await this.page.waitForTimeout(2000);

      // Wait for Reports to be visible and double click
      await this.page.waitForSelector('p:has-text("Reports")', { state: 'visible', timeout: 10000 });
      await this.reportsMenu.dblclick();
      await this.page.waitForTimeout(2000);

      // Wait for My Job Card button to be visible and click
      await this.page.waitForSelector('button:has-text("My Job Card")', { state: 'visible', timeout: 10000 });
      await this.myJobCardButton.click();

      // Wait for navigation to job card page (more flexible pattern)
      await this.page.waitForURL(/.*job.*card.*/, {
        timeout: config.PLAYWRIGHT_TIMEOUT,
      });
    } catch (error) {
      console.error("Failed to navigate to Job Card:", error);
      throw error;
    }
  }

  async navigateToMonthlyAttendance() {
    try {
      // Wait for page to fully load and stabilize
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(2000);

      // First, try to expand the Employee menu if it exists
      const employeeMenu = this.page.locator('p:has-text("Employee")');
      if (await employeeMenu.isVisible()) {
        await employeeMenu.click();
        await this.page.waitForTimeout(1000);
      }

      // Wait for Self Service to be visible and clickable
      await this.page.waitForSelector('p:has-text("Self Service")', { state: 'visible', timeout: 10000 });
      await this.selfServiceMenu.click();
      await this.page.waitForTimeout(2000);

      // Wait for Reports to be visible and double click
      await this.page.waitForSelector('p:has-text("Reports")', { state: 'visible', timeout: 10000 });
      await this.reportsMenu.dblclick();
      await this.page.waitForTimeout(2000);

      // Wait for Monthly Attendance button to be visible and click (exclude Subordinate)
      await this.page.waitForSelector('button:has-text("Monthly Attendance"):not(:has-text("Subordinate"))', { state: 'visible', timeout: 10000 });
      await this.monthlyAttendanceButton.click();

      // Wait for navigation to attendance page (more flexible pattern)
      await this.page.waitForURL(/.*attendance.*/, {
        timeout: config.PLAYWRIGHT_TIMEOUT,
      });
    } catch (error) {
      console.error("Failed to navigate to Monthly Attendance:", error);
      throw error;
    }
  }

  async navigateToDashboard() {
    await this.navigateToMyScreens();
    await this.clickDashboard();
  }

  /** Expand “My Screens” in the sidebar (used before opening Dashboard again). */
  async navigateToMyScreens() {
    await this.waitForMenuToBeVisible();
    await this.myScreensMenu.click();
    await this.page.waitForTimeout(1000);
  }

  async clickDashboard() {
    await this.dashboardButton.click();
    await this.page.waitForURL("**/dashboard**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });
  }

  async clickProfileImage() {
    await this.profileImage.click();
  }

  async navigateToEmployee() {
    // This method is for compatibility with existing tests
    // The employee section is typically the default view after login
    await this.page.waitForLoadState("networkidle");
    console.log("Navigated to Employee section");
  }

  async navigateToSelfService() {
    // This method is for compatibility with existing tests
    // It's part of the navigation flow to access reports
    await this.waitForMenuToBeVisible();
    await this.selfServiceMenu.click();
    await this.page.waitForTimeout(1000);
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

    // Wait for the page to be fully loaded
    await this.page.waitForLoadState("networkidle");

    // Check if we're on the employee dashboard
    const currentUrl = await this.page.url();
    if (currentUrl.includes('/employee/')) {
      console.log('Successfully loaded employee dashboard');
    }
  }

  async waitForMenuToBeVisible() {
    // Wait for either Employee or Self Service menu to be visible
    try {
      await this.page.waitForSelector('p:has-text("Employee"), p:has-text("Self Service")', {
        state: 'visible',
        timeout: 10000
      });
    } catch (error) {
      console.log('Menu not immediately visible, waiting for page to stabilize...');
      await this.page.waitForTimeout(3000);
    }
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

import { Page, Locator, expect } from "@playwright/test";
import { config, getTestData } from "../config/environment";

export class LoginPage {
  readonly page: Page;
  readonly loginFrame: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginFrame = page.locator('iframe[title="Login Page"]');
  }

  async goto() {
    await this.page.goto(config.LOGIN_URL);
    await this.page.waitForLoadState("networkidle");
  }

  async login(username?: string, password?: string) {
    const testData = getTestData();
    const user = username || testData.username;
    const pass = password || testData.password;

    // Wait for iframe to be available
    await this.page.waitForSelector('iframe[title="Login Page"]');
    const frame = this.loginFrame.contentFrame();
    if (!frame) {
      throw new Error("Login iframe not found");
    }

    // Wait for elements to be visible and interact with them
    await frame.locator('input[name="userName"]').waitFor({ state: 'visible' });
    await frame.locator('input[name="userName"]').click();
    await frame.locator('input[name="userName"]').fill(user);

    await frame.locator('input[name="password"]').waitFor({ state: 'visible' });
    await frame.locator('input[name="password"]').click();
    await frame.locator('input[name="password"]').fill(pass);

    // Press Enter to login
    await frame.locator('input[name="password"]').press('Enter');
  }

  async verifyLoginSuccess() {
    // Wait for navigation to employee area
    await this.page.waitForURL("**/employee/**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });

    // Verify we're on the employee page
    await expect(this.page).toHaveURL(/.*employee/);
  }

  async verifyLoginFailure() {
    // Verify error message appears
    const frame = this.loginFrame.contentFrame();
    if (!frame) {
      throw new Error("Login iframe not found");
    }

    const errorMessage = frame.locator(".error-message");
    await expect(errorMessage).toBeVisible();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForURL("**/employee/**", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

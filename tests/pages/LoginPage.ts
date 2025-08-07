import { Page, Locator, expect } from "@playwright/test";
import { config, getTestData } from "../config/environment";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly loginFrame: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginFrame = page.locator('iframe[title="Login Page"]');
    this.usernameInput = this.loginFrame.locator(
      'input[name="Username/ Mobile"]'
    );
    this.passwordInput = this.loginFrame.locator('input[name="Password"]');
    this.rememberMeCheckbox = this.loginFrame.locator(
      'input[name="Remember me"]'
    );
    this.loginButton = this.loginFrame.locator('button[name="Login"]');
  }

  async goto() {
    await this.page.goto(config.LOGIN_URL);
    await this.page.waitForLoadState("networkidle");
  }

  async login(username?: string, password?: string) {
    const testData = getTestData();
    const user = username || testData.username;
    const pass = password || testData.password;

    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    // Wait for navigation to dashboard or success indicator
    await this.page.waitForURL("**/dashboard**", {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    });

    // Verify we're on the dashboard page
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

  async verifyLoginFailure() {
    // Verify error message appears
    const errorMessage = this.loginFrame.locator(".error-message");
    await expect(errorMessage).toBeVisible();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForURL("**/dashboard**", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

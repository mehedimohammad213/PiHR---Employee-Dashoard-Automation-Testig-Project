import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly iframe: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.locator('iframe[title="Login Page"]');
    this.usernameField = this.iframe
      .contentFrame()
      .getByRole("textbox", { name: "Username/ Mobile" });
    this.passwordField = this.iframe
      .contentFrame()
      .getByRole("textbox", { name: "Password" });
    this.rememberMeCheckbox = this.iframe
      .contentFrame()
      .getByRole("checkbox", { name: "Remember me" });
    this.loginButton = this.iframe
      .contentFrame()
      .getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto("https://webable.pihr.xyz/login");
  }

  async login(username: string, password: string, rememberMe: boolean = true) {
    await this.usernameField.click();
    await this.usernameField.fill(username);
    await this.passwordField.click();
    await this.passwordField.fill(password);

    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }

    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    // Wait for navigation or success indicator
    await expect(this.page).not.toHaveURL(/.*login.*/);
  }
}

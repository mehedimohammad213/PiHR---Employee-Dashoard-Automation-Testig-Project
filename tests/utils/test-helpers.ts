import { Page, expect } from "@playwright/test";

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Take a screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await this.page.screenshot({
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true,
    });
  }

  /**
   * Fill a form with provided data
   */
  async fillForm(formData: Record<string, string>) {
    for (const [selector, value] of Object.entries(formData)) {
      await this.page.fill(selector, value);
    }
  }

  /**
   * Verify element is visible and clickable
   */
  async verifyElementClickable(selector: string) {
    const element = this.page.locator(selector);
    await expect(element).toBeVisible();
    await expect(element).toBeEnabled();
  }

  /**
   * Wait for element to be visible with timeout
   */
  async waitForElement(selector: string, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Get text content of an element
   */
  async getElementText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) || "";
  }

  /**
   * Check if element exists
   */
  async elementExists(selector: string): Promise<boolean> {
    return (await this.page.locator(selector).count()) > 0;
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Clear and fill input field
   */
  async clearAndFill(selector: string, value: string) {
    await this.page.locator(selector).clear();
    await this.page.locator(selector).fill(value);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector: string, value: string) {
    await this.page.locator(selector).selectOption(value);
  }

  /**
   * Check checkbox
   */
  async checkCheckbox(selector: string) {
    await this.page.locator(selector).check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheckCheckbox(selector: string) {
    await this.page.locator(selector).uncheck();
  }

  /**
   * Verify URL contains expected path
   */
  async verifyURLContains(expectedPath: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  /**
   * Wait for network request to complete
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }
}

/**
 * Common test data
 */
export const testData = {
  validUser: {
    username: "testuser",
    password: "testpass123",
    email: "test@example.com",
  },
  invalidUser: {
    username: "invalid",
    password: "wrongpass",
    email: "invalid@example.com",
  },
};

/**
 * Common selectors
 */
export const selectors = {
  loginForm: {
    username: '[name="username"]',
    password: '[name="password"]',
    submitButton: '[type="submit"]',
    errorMessage: ".error-message",
  },
  navigation: {
    menu: ".main-menu",
    menuItem: ".menu-item",
  },
};

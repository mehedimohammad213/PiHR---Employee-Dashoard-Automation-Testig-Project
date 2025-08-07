import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object Model class that provides common functionality
 * for all page objects in the framework.
 */
export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://webable.pihr.xyz') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Navigate to the page
   */
  async goto(path: string = ''): Promise<void> {
    const url = path ? `${this.baseUrl}${path}` : this.baseUrl;
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get element by role and name
   */
  getByRole(role: string, name?: string): Locator {
    return this.page.getByRole(role as any, name ? { name } : undefined);
  }

  /**
   * Get element by text
   */
  getByText(text: string): Locator {
    return this.page.getByText(text);
  }

  /**
   * Get element by test ID
   */
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * Get element by selector
   */
  getBySelector(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Click element
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  /**
   * Type text into input field
   */
  async type(locator: Locator, value: string): Promise<void> {
    await locator.type(value);
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Assert element is visible
   */
  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  async assertHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Assert text is present
   */
  async assertText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  /**
   * Assert URL contains path
   */
  async assertUrlContains(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  /**
   * Handle iframe if present
   */
  async getFrame(frameSelector: string) {
    const frame = this.page.locator(frameSelector).contentFrame();
    return frame;
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForURL();
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  /**
   * Go forward
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
    await this.waitForPageLoad();
  }
}

import { Page, expect } from "@playwright/test";

export class TestUtils {
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
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Wait for popup to open and return it
   */
  async waitForPopup() {
    const popupPromise = this.page.waitForEvent("popup");
    return popupPromise;
  }

  /**
   * Wait for download to start and return it
   */
  async waitForDownload() {
    const downloadPromise = this.page.waitForEvent("download");
    return downloadPromise;
  }

  /**
   * Verify element is visible
   */
  async verifyElementVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Verify URL contains expected path
   */
  async verifyURLContains(expectedPath: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Handle iframe interactions safely
   */
  async interactWithIframe(
    iframeSelector: string,
    action: (frame: any) => Promise<void>
  ) {
    const frame = this.page.frameLocator(iframeSelector);
    await action(frame);
  }

  /**
   * Retry action with exponential backoff
   */
  async retryAction(action: () => Promise<void>, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await action();
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.page.waitForTimeout(1000 * Math.pow(2, i));
      }
    }
  }
}

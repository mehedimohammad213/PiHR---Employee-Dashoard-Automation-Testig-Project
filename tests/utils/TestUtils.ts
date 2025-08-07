import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class TestUtils {
  private page: Page;
  private screenshotDir: string;

  constructor(page: Page) {
    this.page = page;
    this.screenshotDir = "test-screenshots";
    this.ensureScreenshotDir();
  }

  private ensureScreenshotDir() {
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
  }

  async takeScreenshot(name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${name}-${timestamp}.png`;
    const filepath = path.join(this.screenshotDir, filename);

    await this.page.screenshot({
      path: filepath,
      fullPage: true
    });

    console.log(`Screenshot saved: ${filepath}`);
    return filepath;
  }

  async debugNavigation() {
    console.log("=== Navigation Debug Info ===");
    console.log("Current URL:", this.page.url());

    // Check for common navigation elements
    const elements = [
      { name: "Self Service", selector: 'p:has-text("Self Service")' },
      { name: "Reports", selector: 'p:has-text("Reports")' },
      { name: "My Job Card", selector: 'button:has-text("My Job Card")' },
      { name: "Monthly Attendance", selector: 'button:has-text("Monthly Attendance")' },
      { name: "Employee Menu", selector: 'p:has-text("Employee")' }
    ];

    for (const element of elements) {
      const count = await this.page.locator(element.selector).count();
      console.log(`${element.name} exists: ${count > 0}`);

      if (count > 0) {
        const isVisible = await this.page.locator(element.selector).isVisible();
        console.log(`${element.name} visible: ${isVisible}`);
      }
    }

    // List all buttons for debugging
    const allButtons = await this.page.locator('button').all();
    console.log(`Total buttons found: ${allButtons.length}`);

    for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
      const button = allButtons[i];
      const text = await button.textContent();
      const name = await button.getAttribute('name');
      console.log(`Button ${i}: text="${text?.trim()}", name="${name}"`);
    }
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({
        state: 'visible',
        timeout
      });
      return true;
    } catch {
      return false;
    }
  }

  async retryAction<T>(
    action: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        console.log(`Attempt ${attempt} failed:`, error);

        if (attempt === maxRetries) {
          throw lastError;
        }

        await this.page.waitForTimeout(delay);
      }
    }

    throw lastError!;
  }

  async logPageInfo() {
    console.log("=== Page Information ===");
    console.log("URL:", this.page.url());
    console.log("Title:", await this.page.title());

    // Check for common elements
    const frameCount = this.page.frames().length;
    console.log("Frame count:", frameCount);

    // List all frames
    this.page.frames().forEach((frame, index) => {
      console.log(`Frame ${index}:`, frame.url());
    });
  }

  async waitForNetworkIdle(timeout: number = 10000) {
    try {
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch (error) {
      console.log("Network idle timeout, continuing...");
    }
  }

  async safeClick(selector: string, description: string = "element") {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      await element.click();
      console.log(`Successfully clicked ${description}`);
    } catch (error) {
      console.error(`Failed to click ${description}:`, error);
      throw error;
    }
  }

  async safeFill(selector: string, value: string, description: string = "input") {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      await element.fill(value);
      console.log(`Successfully filled ${description} with: ${value}`);
    } catch (error) {
      console.error(`Failed to fill ${description}:`, error);
      throw error;
    }
  }
}

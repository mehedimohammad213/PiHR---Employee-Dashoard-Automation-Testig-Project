import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

test.describe("Allure Demo Tests", () => {
  test("Basic Allure Test with Steps", async ({ page }) => {
    // Test metadata
    allure.description("A simple test demonstrating Allure reporting features");
    allure.severity("high");
    allure.epic("Demo");
    allure.feature("Allure Integration");
    allure.story("Basic Reporting");

    // Test parameters
    allure.parameter("url", "https://playwright.dev/");
    allure.parameter("expectedTitle", "Playwright");

    // Test steps
    allure.step("Navigate to Playwright website", async () => {
      await page.goto("https://playwright.dev/");
      await page.screenshot({ path: "screenshots/playwright-homepage.png" });
    });

    allure.step("Verify page title", async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    allure.step("Click on Get Started link", async () => {
      await page.getByRole("link", { name: "Get started" }).click();
      await page.screenshot({ path: "screenshots/get-started-page.png" });
    });

    allure.step("Verify installation heading", async () => {
      await expect(
        page.getByRole("heading", { name: "Installation" })
      ).toBeVisible();
    });

    // Add custom attachment
    allure.attachment(
      "test-info",
      JSON.stringify(
        {
          browser: "chromium",
          viewport: "1280x720",
          timestamp: new Date().toISOString(),
        },
        null,
        2
      ),
      "application/json"
    );
  });

  test("Test with Different Severity Levels", async ({ page }) => {
    allure.description(
      "Test demonstrating different severity levels in Allure"
    );
    allure.severity("critical");
    allure.epic("Demo");
    allure.feature("Severity Levels");
    allure.story("Critical Test");

    allure.step("Critical step - Login functionality", async () => {
      await page.goto("https://example.com/");
      await expect(page).toHaveTitle(/Example Domain/);
    });

    allure.step("High priority step - Navigation", async () => {
      await page.getByRole("heading", { name: "Example Domain" }).click();
    });
  });

  test("Test with Environment Information", async ({ page }) => {
    allure.description("Test with environment and system information");
    allure.severity("medium");
    allure.epic("Demo");
    allure.feature("Environment Info");
    allure.story("System Details");

    // Add environment information
    allure.attachment(
      "environment",
      JSON.stringify(
        {
          platform: process.platform,
          nodeVersion: process.version,
          playwrightVersion: "1.40.0",
          browser: "chromium",
        },
        null,
        2
      ),
      "application/json"
    );

    allure.step("Check system information", async () => {
      await page.goto("https://example.com/");
      await expect(page).toHaveTitle(/Example Domain/);
    });
  });

  test("Test with Performance Metrics", async ({ page }) => {
    allure.description("Test demonstrating performance metrics in Allure");
    allure.severity("medium");
    allure.epic("Demo");
    allure.feature("Performance");
    allure.story("Load Time Metrics");

    const startTime = Date.now();

    allure.step("Measure page load time", async () => {
      await page.goto("https://playwright.dev/");
      const loadTime = Date.now() - startTime;

      // Add performance metrics
      allure.attachment("load-time-ms", loadTime.toString(), "text/plain");
      allure.attachment(
        "performance-metrics",
        JSON.stringify(
          {
            loadTime: loadTime,
            timestamp: new Date().toISOString(),
            url: "https://playwright.dev/",
          },
          null,
          2
        ),
        "application/json"
      );
    });

    allure.step("Verify page loaded successfully", async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });
  });

  test("Test with Screenshots and Attachments", async ({ page }) => {
    allure.description("Test demonstrating screenshots and file attachments");
    allure.severity("low");
    allure.epic("Demo");
    allure.feature("Attachments");
    allure.story("Screenshots and Files");

    allure.step("Take screenshot of homepage", async () => {
      await page.goto("https://playwright.dev/");
      const screenshot = await page.screenshot({ fullPage: true });
      allure.attachment("homepage-screenshot", screenshot, "image/png");
    });

    allure.step("Add text attachment", async () => {
      const testData = "This is test data for demonstration purposes";
      allure.attachment("test-data.txt", testData, "text/plain");
    });

    allure.step("Add JSON attachment", async () => {
      const jsonData = {
        testName: "Allure Demo Test",
        timestamp: new Date().toISOString(),
        status: "running",
      };
      allure.attachment(
        "test-status.json",
        JSON.stringify(jsonData, null, 2),
        "application/json"
      );
    });
  });
});

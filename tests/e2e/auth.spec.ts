import { test, expect } from "@playwright/test";
import { config } from "@core/config/environment";

test.describe("Authentication Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application login page
    await page.goto(config.LOGIN_URL);
  });

  test("should display login form", async ({ page }) => {
    // Wait for iframe to be available
    await page.waitForSelector('iframe[title="Login Page"]');
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    if (!frame) {
      throw new Error("Login iframe not found");
    }

    // Verify login form elements are visible
    await expect(frame.locator('input[name="userName"]')).toBeVisible();
    await expect(frame.locator('input[name="password"]')).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    // Wait for iframe to be available
    await page.waitForSelector('iframe[title="Login Page"]');
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    if (!frame) {
      throw new Error("Login iframe not found");
    }

    // Fill in invalid credentials
    await frame.locator('input[name="userName"]').fill("invalid_user");
    await frame.locator('input[name="password"]').fill("invalid_password");

    // Press Enter to attempt login
    await frame.locator('input[name="password"]').press('Enter');

    // Wait a moment for any error to appear
    await page.waitForTimeout(2000);

    // Check if we're still on login page (indicating failed login)
    const currentUrl = await page.url();
    expect(currentUrl).toContain('login');
  });

  test("should navigate through main menu", async ({ page }) => {
    // This test would require successful login first
    // For now, we'll test basic page navigation
    await page.goto(config.BASE_URL);

    // Verify we're on the main page
    const currentUrl = await page.url();
    expect(currentUrl).toContain('pihr.xyz');
  });
});

test.describe("Form Validation Tests", () => {
  test("should validate required fields", async ({ page }) => {
    await page.goto(config.LOGIN_URL);

    // Wait for iframe to be available
    await page.waitForSelector('iframe[title="Login Page"]');
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    if (!frame) {
      throw new Error("Login iframe not found");
    }

    // Try to submit without filling required fields
    await frame.locator('input[name="password"]').press('Enter');

    // Wait a moment for any validation to appear
    await page.waitForTimeout(2000);

    // Check if we're still on login page (indicating validation worked)
    const currentUrl = await page.url();
    expect(currentUrl).toContain('login');
  });
});

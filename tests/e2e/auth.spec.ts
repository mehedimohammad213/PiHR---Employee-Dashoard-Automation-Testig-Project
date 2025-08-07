import { test, expect } from "@playwright/test";

test.describe("Authentication Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a test site before each test
    await page.goto("https://demo.testfire.net/");
  });

  test("should display login form", async ({ page }) => {
    // Click on the login link
    await page.getByRole("link", { name: "ONLINE BANKING LOGIN" }).click();

    // Verify login form is visible
    await expect(page.getByRole("textbox", { name: "User ID" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    // Navigate to login page
    await page.getByRole("link", { name: "ONLINE BANKING LOGIN" }).click();

    // Fill in invalid credentials
    await page.getByRole("textbox", { name: "User ID" }).fill("invalid_user");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("invalid_password");

    // Click login button
    await page.getByRole("button", { name: "Login" }).click();

    // Verify error message appears
    await expect(page.locator(".error")).toBeVisible();
  });

  test("should navigate through main menu", async ({ page }) => {
    // Test navigation through different menu items
    await page.getByRole("link", { name: "PERSONAL" }).click();
    await expect(page).toHaveURL(/.*personal.*/);

    await page.getByRole("link", { name: "SMALL BUSINESS" }).click();
    await expect(page).toHaveURL(/.*small-business.*/);
  });
});

test.describe("Form Validation Tests", () => {
  test("should validate required fields", async ({ page }) => {
    await page.goto("https://demo.testfire.net/");

    // Navigate to contact form or any form with validation
    await page.getByRole("link", { name: "CONTACT US" }).click();

    // Try to submit without filling required fields
    await page.getByRole("button", { name: "Submit" }).click();

    // Verify validation messages appear
    // Note: This is a generic example - actual selectors would depend on the site
    await expect(page.locator(".error-message")).toBeVisible();
  });
});

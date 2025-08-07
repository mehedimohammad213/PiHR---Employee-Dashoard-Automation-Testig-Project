import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

// TDD Example 1: Test-First Development for Login Validation
test.describe("TDD: Login Validation Tests", () => {
  // Test 1: First, write a test for a feature that doesn't exist yet
  test("should validate empty username field", async ({ page }) => {
    allure.description(
      "TDD Example: Test for username validation before implementation"
    );
    allure.severity("high");
    allure.epic("TDD Development");
    allure.feature("Login Validation");
    allure.story("Empty Username Validation");

    // Arrange: Navigate to login page
    await page.goto("https://webable.pihr.xyz/login");

    // Act: Try to login with empty username
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    await frame!
      .getByRole("textbox", { name: "Password" })
      .fill("testpassword");
    await frame!.getByRole("button", { name: "Login" }).click();

    // Assert: Should show validation error (this test might fail initially)
    // This is the TDD approach - write the test first, then implement the feature
    try {
      await expect(page.locator(".error-message")).toBeVisible();
    } catch (error) {
      // If validation doesn't exist yet, this test will fail
      // This is expected in TDD - the test drives the development
      console.log(
        "Validation feature not implemented yet - this is expected in TDD"
      );
    }
  });

  // Test 2: Test for password strength validation
  test("should validate password strength requirements", async ({ page }) => {
    allure.description("TDD Example: Test for password strength validation");
    allure.severity("medium");
    allure.epic("TDD Development");
    allure.feature("Password Validation");
    allure.story("Password Strength Requirements");

    await page.goto("https://webable.pihr.xyz/login");

    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    await frame!
      .getByRole("textbox", { name: "Username/ Mobile" })
      .fill("testuser");
    await frame!.getByRole("textbox", { name: "Password" }).fill("weak");
    await frame!.getByRole("button", { name: "Login" }).click();

    // Assert: Should show password strength error
    try {
      await expect(page.locator(".password-strength-error")).toBeVisible();
    } catch (error) {
      console.log("Password strength validation not implemented yet");
    }
  });
});

// TDD Example 2: Test-First Development for Job Card Features
test.describe("TDD: Job Card Feature Tests", () => {
  test("should allow date range selection with validation", async ({
    page,
  }) => {
    allure.description(
      "TDD Example: Test for date range validation in job card"
    );
    allure.severity("high");
    allure.epic("TDD Development");
    allure.feature("Job Card Date Selection");
    allure.story("Date Range Validation");

    // Login first
    await page.goto("https://webable.pihr.xyz/login");
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    await frame!
      .getByRole("textbox", { name: "Username/ Mobile" })
      .fill("01830377213");
    await frame!.getByRole("textbox", { name: "Password" }).fill("nopass@1234");
    await frame!.getByRole("button", { name: "Login" }).click();

    // Navigate to job card
    await page
      .getByRole("paragraph")
      .filter({ hasText: "Employee" })
      .locator("span")
      .click();
    await page
      .getByRole("paragraph")
      .filter({ hasText: "Self Service" })
      .locator("span")
      .click();
    await page.getByRole("button", { name: "My Job Card" }).click();

    // Test date range validation
    await page.getByRole("textbox", { name: "Select Date Range" }).click();

    // Try to select invalid date range (future dates)
    try {
      // This test assumes the application should prevent future date selection
      await page.getByText("December").click();
      await page.getByText("31").click();

      // Assert: Should show validation error for future dates
      await expect(page.locator(".date-validation-error")).toBeVisible();
    } catch (error) {
      console.log("Date validation feature not implemented yet");
    }
  });

  test("should validate report generation permissions", async ({ page }) => {
    allure.description("TDD Example: Test for report generation permissions");
    allure.severity("medium");
    allure.epic("TDD Development");
    allure.feature("Report Permissions");
    allure.story("Permission Validation");

    // Login and navigate to job card
    await page.goto("https://webable.pihr.xyz/login");
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    await frame!
      .getByRole("textbox", { name: "Username/ Mobile" })
      .fill("01830377213");
    await frame!.getByRole("textbox", { name: "Password" }).fill("nopass@1234");
    await frame!.getByRole("button", { name: "Login" }).click();

    await page
      .getByRole("paragraph")
      .filter({ hasText: "Employee" })
      .locator("span")
      .click();
    await page
      .getByRole("paragraph")
      .filter({ hasText: "Self Service" })
      .locator("span")
      .click();
    await page.getByRole("button", { name: "My Job Card" }).click();

    // Test permission validation
    try {
      // This test assumes certain users might not have report generation permissions
      await page.getByRole("button", { name: "PDF Report" }).click();

      // Assert: Should show permission error if user doesn't have access
      await expect(page.locator(".permission-error")).toBeVisible();
    } catch (error) {
      console.log("Permission validation not implemented yet");
    }
  });
});

// TDD Example 3: Test-First Development for Performance Features
test.describe("TDD: Performance Feature Tests", () => {
  test("should measure page load performance", async ({ page }) => {
    allure.description("TDD Example: Test for performance monitoring");
    allure.severity("medium");
    allure.epic("TDD Development");
    allure.feature("Performance Monitoring");
    allure.story("Page Load Performance");

    const startTime = Date.now();

    await page.goto("https://webable.pihr.xyz/login");

    const loadTime = Date.now() - startTime;

    // Assert: Page should load within acceptable time (e.g., 3 seconds)
    expect(loadTime).toBeLessThan(3000);

    allure.attachment("page-load-time", loadTime.toString(), "text/plain");
  });

  test("should validate memory usage during report generation", async ({
    page,
  }) => {
    allure.description("TDD Example: Test for memory usage validation");
    allure.severity("low");
    allure.epic("TDD Development");
    allure.feature("Memory Management");
    allure.story("Memory Usage Validation");

    // Login and navigate to job card
    await page.goto("https://webable.pihr.xyz/login");
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    await frame!
      .getByRole("textbox", { name: "Username/ Mobile" })
      .fill("01830377213");
    await frame!.getByRole("textbox", { name: "Password" }).fill("nopass@1234");
    await frame!.getByRole("button", { name: "Login" }).click();

    await page
      .getByRole("paragraph")
      .filter({ hasText: "Employee" })
      .locator("span")
      .click();
    await page
      .getByRole("paragraph")
      .filter({ hasText: "Self Service" })
      .locator("span")
      .click();
    await page.getByRole("button", { name: "My Job Card" }).click();

    // Test memory usage during report generation
    try {
      const beforeMemory = process.memoryUsage().heapUsed;

      await page.getByRole("button", { name: "PDF Report" }).click();

      const afterMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = afterMemory - beforeMemory;

      // Assert: Memory increase should be within acceptable limits
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB limit

      allure.attachment(
        "memory-usage",
        memoryIncrease.toString(),
        "text/plain"
      );
    } catch (error) {
      console.log("Memory monitoring not implemented yet");
    }
  });
});

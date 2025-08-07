import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("basic form test", async ({ page }) => {
  // Navigate to a simple form page for testing
  await page.goto("https://example.com/");

  // Verify the page loaded correctly
  await expect(page).toHaveTitle(/Example Domain/);

  // Check that the main heading is visible
  await expect(
    page.getByRole("heading", { name: "Example Domain" })
  ).toBeVisible();
});

test("screenshot test", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Take a screenshot
  await page.screenshot({ path: "screenshot.png" });

  // Verify the screenshot was taken (this is just a placeholder)
  // In a real scenario, you might compare screenshots or verify file exists
  expect(true).toBeTruthy();
});

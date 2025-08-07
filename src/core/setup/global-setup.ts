import { chromium, FullConfig } from "@playwright/test";
import { config } from "../config/environment";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;

  // Skip setup if no storage state is configured
  if (!storageState) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to login page
  await page.goto(`${baseURL}/login`);

  // Wait for login form to be ready
  await page.waitForSelector('iframe[title="Login Page"]');

  // Get test credentials from environment
  const username = config.TEST_USERNAME;
  const password = config.TEST_PASSWORD;

  // Perform login
  const frame = page.frameLocator('iframe[title="Login Page"]');
  await frame.locator('input[name="Username/ Mobile"]').fill(username);
  await frame.locator('input[name="Password"]').fill(password);
  await frame.locator('input[name="Remember me"]').check();
  await frame.locator('button[name="Login"]').click();

  // Wait for successful login
  await page.waitForURL("**/dashboard**", {
    timeout: config.PLAYWRIGHT_TIMEOUT,
  });

  // Save signed-in state
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;

import { FullConfig } from "@playwright/test";
import { config as env } from "../config/environment";

async function globalTeardown(_playwrightConfig: FullConfig) {
  // Clean up any test artifacts
  console.log("Cleaning up test artifacts...");

  // Log test completion
  console.log(`Test run completed in ${env.NODE_ENV} environment`);
  console.log(`Base URL: ${env.BASE_URL}`);
  console.log(`Browser: ${env.BROWSER_TYPE}`);
  console.log(`Headless: ${env.PLAYWRIGHT_HEADLESS}`);

  // Additional cleanup tasks can be added here
  // For example:
  // - Clean up temporary files
  // - Reset test data
  // - Close any open connections
  // - Generate final reports
}

export default globalTeardown;

import { FullConfig } from "@playwright/test";
import { config } from "../config/environment";

async function globalTeardown(config: FullConfig) {
  // Clean up any test artifacts
  console.log("Cleaning up test artifacts...");

  // Log test completion
  console.log(`Test run completed in ${config.NODE_ENV} environment`);
  console.log(`Base URL: ${config.BASE_URL}`);
  console.log(`Browser: ${config.BROWSER_TYPE}`);
  console.log(`Headless: ${config.PLAYWRIGHT_HEADLESS}`);

  // Additional cleanup tasks can be added here
  // For example:
  // - Clean up temporary files
  // - Reset test data
  // - Close any open connections
  // - Generate final reports
}

export default globalTeardown;

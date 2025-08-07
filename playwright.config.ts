import { defineConfig, devices } from "@playwright/test";
import { config } from "./tests/config/environment";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: config.ALLURE_RESULTS_DIR,
        suiteTitle: false,
        attachments: true,
        environmentInfo: {
          framework: "Playwright",
          language: "TypeScript",
          baseUrl: config.BASE_URL,
          environment: config.NODE_ENV,
          browser: config.BROWSER_TYPE,
          headless: config.PLAYWRIGHT_HEADLESS,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",

    /* Record video on failure */
    video: "retain-on-failure",

    /* Global timeout for each action */
    actionTimeout: config.PLAYWRIGHT_TIMEOUT,

    /* Global timeout for navigation */
    navigationTimeout: config.PLAYWRIGHT_TIMEOUT,

    /* Global timeout for each assertion */
    expect: {
      timeout: config.PLAYWRIGHT_TIMEOUT,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {
          width: config.BROWSER_WIDTH,
          height: config.BROWSER_HEIGHT,
        },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: {
          width: config.BROWSER_WIDTH,
          height: config.BROWSER_HEIGHT,
        },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: {
          width: config.BROWSER_WIDTH,
          height: config.BROWSER_HEIGHT,
        },
      },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start",
    url: config.BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* Global setup and teardown */
  globalSetup: require.resolve("./tests/setup/global-setup.ts"),
  globalTeardown: require.resolve("./tests/setup/global-teardown.ts"),

  /* Test timeout */
  timeout: config.TEST_TIMEOUT,

  /* Expect timeout */
  expect: {
    timeout: config.PLAYWRIGHT_TIMEOUT,
  },

  /* Output directory for test artifacts */
  outputDir: "test-results/",

  /* Preserve test output */
  preserveOutput: "failures-only",

  /* Report slow tests */
  reportSlowTests: {
    max: 5,
    threshold: 15000,
  },

  /* Metadata for the test run */
  metadata: {
    environment: config.NODE_ENV,
    browser: config.BROWSER_TYPE,
    headless: config.PLAYWRIGHT_HEADLESS,
    baseUrl: config.BASE_URL,
    timeout: config.PLAYWRIGHT_TIMEOUT,
    retries: config.PLAYWRIGHT_RETRIES,
  },
});

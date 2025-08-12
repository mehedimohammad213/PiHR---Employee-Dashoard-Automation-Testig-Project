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
    allure.parameter("testType", "Mock Test");
    allure.parameter("expectedResult", "Success");

    // Test steps
    allure.step("Set up mock data", async () => {
      // Mock data setup
      const mockData = {
        username: "testuser",
        status: "active",
        timestamp: new Date().toISOString()
      };
      allure.attachment("mock-data", JSON.stringify(mockData, null, 2), "application/json");
    });

    allure.step("Perform mock validation", async () => {
      // Mock validation logic
      const isValid = true;
      expect(isValid).toBe(true);
    });

    allure.step("Verify mock results", async () => {
      // Mock verification
      const result = "success";
      expect(result).toBe("success");
    });

    // Add custom attachment
    allure.attachment(
      "test-info",
      JSON.stringify(
        {
          browser: "chromium",
          viewport: "1280x720",
          timestamp: new Date().toISOString(),
          testType: "mock"
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

    allure.step("Critical step - Mock login validation", async () => {
      const loginData = { username: "testuser", password: "testpass" };
      const isValid = Boolean(loginData.username && loginData.password);
      expect(isValid).toBe(true);
    });

    allure.step("High priority step - Mock navigation", async () => {
      const navigationState = "successful";
      expect(navigationState).toBe("successful");
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
      const systemInfo = {
        platform: process.platform,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
      };
      expect(systemInfo.platform).toBeDefined();
      expect(systemInfo.nodeVersion).toBeDefined();
    });
  });

  test("Test with Performance Metrics", async ({ page }) => {
    allure.description("Test demonstrating performance metrics in Allure");
    allure.severity("medium");
    allure.epic("Demo");
    allure.feature("Performance");
    allure.story("Load Time Metrics");

    const startTime = Date.now();

    allure.step("Measure mock operation time", async () => {
      // Simulate some operation
      await page.waitForTimeout(100);
      const operationTime = Date.now() - startTime;

      // Add performance metrics
      allure.attachment("operation-time-ms", operationTime.toString(), "text/plain");
      allure.attachment(
        "performance-metrics",
        JSON.stringify(
          {
            operationTime: operationTime,
            timestamp: new Date().toISOString(),
            operation: "mock-data-processing",
          },
          null,
          2
        ),
        "application/json"
      );
    });

    allure.step("Verify mock operation completed", async () => {
      const isCompleted = true;
      expect(isCompleted).toBe(true);
    });
  });

  test("Test with Screenshots and Attachments", async ({ page }) => {
    allure.description("Test demonstrating screenshots and file attachments");
    allure.severity("low");
    allure.epic("Demo");
    allure.feature("Attachments");
    allure.story("Screenshots and Files");

    allure.step("Create mock screenshot data", async () => {
      // Create a simple mock screenshot (1x1 pixel PNG)
      const mockScreenshot = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
      allure.attachment("mock-screenshot.png", mockScreenshot, "image/png");
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

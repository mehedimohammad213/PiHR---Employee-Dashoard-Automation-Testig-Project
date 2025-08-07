import { Page, Browser, BrowserContext } from '@playwright/test';

/**
 * Test execution status
 */
export type TestStatus = 'passed' | 'failed' | 'skipped' | 'pending';

/**
 * Test severity levels
 */
export type TestSeverity = 'critical' | 'high' | 'medium' | 'low';

/**
 * Browser types
 */
export type BrowserType = 'chromium' | 'firefox' | 'webkit';

/**
 * Test environment types
 */
export type EnvironmentType = 'development' | 'staging' | 'production' | 'testing';

/**
 * Test categories
 */
export type TestCategory = 'smoke' | 'regression' | 'performance' | 'security' | 'api' | 'ui' | 'e2e';

/**
 * Report formats
 */
export type ReportFormat = 'html' | 'json' | 'xml' | 'allure' | 'cucumber';

/**
 * Screenshot types
 */
export type ScreenshotType = 'on-failure' | 'on-success' | 'manual' | 'always';

/**
 * Video recording types
 */
export type VideoType = 'on-first-retry' | 'on-failure' | 'retain-on-failure' | 'always' | 'off';

/**
 * Trace recording types
 */
export type TraceType = 'on-first-retry' | 'on-failure' | 'retain-on-failure' | 'always' | 'off';

/**
 * Test metadata
 */
export interface TestMetadata {
  epic?: string;
  feature?: string;
  story?: string;
  severity?: TestSeverity;
  category?: TestCategory;
  tags?: string[];
  description?: string;
  author?: string;
  created?: Date;
  updated?: Date;
}

/**
 * Test configuration
 */
export interface TestConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  browser: BrowserType;
  viewport: {
    width: number;
    height: number;
  };
  screenshot: ScreenshotType;
  video: VideoType;
  trace: TraceType;
}

/**
 * Test context
 */
export interface TestContext {
  page: Page;
  browser: Browser;
  context: BrowserContext;
  metadata: TestMetadata;
  config: TestConfig;
}

/**
 * Test result
 */
export interface TestResult {
  name: string;
  status: TestStatus;
  duration: number;
  error?: Error;
  metadata: TestMetadata;
  screenshots?: string[];
  video?: string;
  trace?: string;
}

/**
 * Test suite result
 */
export interface TestSuiteResult {
  name: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  results: TestResult[];
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

/**
 * API response
 */
export interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
  duration: number;
}

/**
 * Test data provider
 */
export type TestDataProvider<T = any> = () => T | Promise<T>;

/**
 * Test hook function
 */
export type TestHook = (context: TestContext) => Promise<void> | void;

/**
 * Test assertion function
 */
export type TestAssertion<T = any> = (actual: T, expected: T) => Promise<void> | void;

/**
 * Test step function
 */
export type TestStep<T = any> = (context: TestContext, data?: T) => Promise<void> | void;

/**
 * Test flow function
 */
export type TestFlow<T = any> = (context: TestContext, data?: T) => Promise<void> | void;

/**
 * Report configuration
 */
export interface ReportConfig {
  format: ReportFormat;
  outputDir: string;
  includeMetadata: boolean;
  includeScreenshots: boolean;
  includeVideos: boolean;
  includeTraces: boolean;
}

/**
 * CI/CD configuration
 */
export interface CiCdConfig {
  provider: 'github' | 'gitlab' | 'jenkins' | 'azure' | 'circleci';
  environment: EnvironmentType;
  parallel: boolean;
  workers: number;
  artifacts: {
    reports: boolean;
    screenshots: boolean;
    videos: boolean;
    traces: boolean;
  };
}

/**
 * Notification configuration
 */
export interface NotificationConfig {
  slack?: {
    webhookUrl: string;
    channel: string;
    enabled: boolean;
  };
  email?: {
    smtp: string;
    from: string;
    to: string[];
    enabled: boolean;
  };
  teams?: {
    webhookUrl: string;
    enabled: boolean;
  };
}

/**
 * Complete framework configuration
 */
export interface FrameworkConfig {
  test: TestConfig;
  report: ReportConfig;
  cicd: CiCdConfig;
  notification: NotificationConfig;
  metadata: TestMetadata;
}

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export interface EnvironmentConfig {
  // Application URLs
  BASE_URL: string;
  LOGIN_URL: string;
  DASHBOARD_URL: string;
  JOB_CARD_URL: string;
  ATTENDANCE_URL: string;

  // Test Data
  TEST_USERNAME: string;
  TEST_PASSWORD: string;
  TEST_EMAIL: string;

  // Environment Configuration
  NODE_ENV: string;
  PLAYWRIGHT_HEADLESS: boolean;
  PLAYWRIGHT_TIMEOUT: number;
  PLAYWRIGHT_RETRIES: number;

  // Browser Configuration
  BROWSER_TYPE: string;
  BROWSER_WIDTH: number;
  BROWSER_HEIGHT: number;

  // Test Configuration
  TEST_TIMEOUT: number;
  TEST_RETRIES: number;
  PARALLEL_TESTS: number;

  // Reporting Configuration
  ALLURE_RESULTS_DIR: string;
  ALLURE_REPORT_DIR: string;
  CUCUMBER_REPORT_FILE: string;

  // Docker Configuration
  DOCKER_IMAGE_NAME: string;
  DOCKER_PORT: number;

  // CI/CD Configuration
  CI_ENVIRONMENT: string;
  CD_ENVIRONMENT: string;
  DEPLOYMENT_URL: string;

  // Notification URLs
  SLACK_WEBHOOK_URL: string;
  EMAIL_SERVICE_URL: string;
  TEAMS_WEBHOOK_URL: string;

  // External Services
  API_BASE_URL: string;
  REPORTING_SERVICE_URL: string;
  MONITORING_URL: string;

  // Security Configuration
  API_KEY: string;
  SECRET_KEY: string;
  JWT_SECRET: string;

  // Database Configuration
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;

  // Performance Configuration
  PERFORMANCE_THRESHOLD: number;
  LOAD_TEST_USERS: number;
  STRESS_TEST_DURATION: number;

  // Logging Configuration
  LOG_LEVEL: string;
  LOG_FILE: string;
  DEBUG_MODE: boolean;

  // Feature Flags
  ENABLE_BDD_TESTS: boolean;
  ENABLE_TDD_TESTS: boolean;
  ENABLE_PERFORMANCE_TESTS: boolean;
  ENABLE_SECURITY_TESTS: boolean;
  ENABLE_ALLURE_REPORTING: boolean;

  // Test Categories
  SMOKE_TEST_TAGS: string;
  REGRESSION_TEST_TAGS: string;
  PERFORMANCE_TEST_TAGS: string;
  SECURITY_TEST_TAGS: string;

  // Report Retention
  REPORT_RETENTION_DAYS: number;
  ARCHIVE_RETENTION_DAYS: number;
  LOG_RETENTION_DAYS: number;

  // Notification Configuration
  ENABLE_SLACK_NOTIFICATIONS: boolean;
  ENABLE_EMAIL_NOTIFICATIONS: boolean;
  ENABLE_TEAMS_NOTIFICATIONS: boolean;
  NOTIFICATION_FREQUENCY: string;

  // Monitoring Configuration
  ENABLE_MONITORING: boolean;
  METRICS_COLLECTION: boolean;
  HEALTH_CHECK_URL: string;
}

export const config: EnvironmentConfig = {
  // Application URLs
  BASE_URL: process.env.BASE_URL || 'https://webable.pihr.xyz',
  LOGIN_URL: process.env.LOGIN_URL || 'https://webable.pihr.xyz/login',
  DASHBOARD_URL: process.env.DASHBOARD_URL || 'https://webable.pihr.xyz/dashboard',
  JOB_CARD_URL: process.env.JOB_CARD_URL || 'https://webable.pihr.xyz/job-card',
  ATTENDANCE_URL: process.env.ATTENDANCE_URL || 'https://webable.pihr.xyz/attendance',

  // Test Data
  TEST_USERNAME: process.env.TEST_USERNAME || '01830377213',
  TEST_PASSWORD: process.env.TEST_PASSWORD || 'nopass@1234',
  TEST_EMAIL: process.env.TEST_EMAIL || 'test@example.com',

  // Environment Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PLAYWRIGHT_HEADLESS: process.env.PLAYWRIGHT_HEADLESS === 'true',
  PLAYWRIGHT_TIMEOUT: parseInt(process.env.PLAYWRIGHT_TIMEOUT || '30000'),
  PLAYWRIGHT_RETRIES: parseInt(process.env.PLAYWRIGHT_RETRIES || '2'),

  // Browser Configuration
  BROWSER_TYPE: process.env.BROWSER_TYPE || 'chromium',
  BROWSER_WIDTH: parseInt(process.env.BROWSER_WIDTH || '1920'),
  BROWSER_HEIGHT: parseInt(process.env.BROWSER_HEIGHT || '1080'),

  // Test Configuration
  TEST_TIMEOUT: parseInt(process.env.TEST_TIMEOUT || '30000'),
  TEST_RETRIES: parseInt(process.env.TEST_RETRIES || '1'),
  PARALLEL_TESTS: parseInt(process.env.PARALLEL_TESTS || '2'),

  // Reporting Configuration
  ALLURE_RESULTS_DIR: process.env.ALLURE_RESULTS_DIR || 'allure-results',
  ALLURE_REPORT_DIR: process.env.ALLURE_REPORT_DIR || 'allure-report',
  CUCUMBER_REPORT_FILE: process.env.CUCUMBER_REPORT_FILE || 'cucumber-report.html',

  // Docker Configuration
  DOCKER_IMAGE_NAME: process.env.DOCKER_IMAGE_NAME || 'pihr-playwright-tests',
  DOCKER_PORT: parseInt(process.env.DOCKER_PORT || '8080'),

  // CI/CD Configuration
  CI_ENVIRONMENT: process.env.CI_ENVIRONMENT || 'staging',
  CD_ENVIRONMENT: process.env.CD_ENVIRONMENT || 'production',
  DEPLOYMENT_URL: process.env.DEPLOYMENT_URL || 'https://your-deployment-url.com',

  // Notification URLs
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
  EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL || 'https://api.emailservice.com/send',
  TEAMS_WEBHOOK_URL: process.env.TEAMS_WEBHOOK_URL || '',

  // External Services
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.pihr.xyz',
  REPORTING_SERVICE_URL: process.env.REPORTING_SERVICE_URL || 'https://reports.pihr.xyz',
  MONITORING_URL: process.env.MONITORING_URL || 'https://monitoring.pihr.xyz',

  // Security Configuration
  API_KEY: process.env.API_KEY || 'your-api-key-here',
  SECRET_KEY: process.env.SECRET_KEY || 'your-secret-key-here',
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-here',

  // Database Configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_NAME: process.env.DB_NAME || 'pihr_test_db',
  DB_USER: process.env.DB_USER || 'test_user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'test_password',

  // Performance Configuration
  PERFORMANCE_THRESHOLD: parseInt(process.env.PERFORMANCE_THRESHOLD || '2000'),
  LOAD_TEST_USERS: parseInt(process.env.LOAD_TEST_USERS || '100'),
  STRESS_TEST_DURATION: parseInt(process.env.STRESS_TEST_DURATION || '300'),

  // Logging Configuration
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FILE: process.env.LOG_FILE || 'test-execution.log',
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',

  // Feature Flags
  ENABLE_BDD_TESTS: process.env.ENABLE_BDD_TESTS === 'true',
  ENABLE_TDD_TESTS: process.env.ENABLE_TDD_TESTS === 'true',
  ENABLE_PERFORMANCE_TESTS: process.env.ENABLE_PERFORMANCE_TESTS === 'true',
  ENABLE_SECURITY_TESTS: process.env.ENABLE_SECURITY_TESTS === 'true',
  ENABLE_ALLURE_REPORTING: process.env.ENABLE_ALLURE_REPORTING === 'true',

  // Test Categories
  SMOKE_TEST_TAGS: process.env.SMOKE_TEST_TAGS || '@smoke',
  REGRESSION_TEST_TAGS: process.env.REGRESSION_TEST_TAGS || '@regression',
  PERFORMANCE_TEST_TAGS: process.env.PERFORMANCE_TEST_TAGS || '@performance',
  SECURITY_TEST_TAGS: process.env.SECURITY_TEST_TAGS || '@security',

  // Report Retention
  REPORT_RETENTION_DAYS: parseInt(process.env.REPORT_RETENTION_DAYS || '30'),
  ARCHIVE_RETENTION_DAYS: parseInt(process.env.ARCHIVE_RETENTION_DAYS || '90'),
  LOG_RETENTION_DAYS: parseInt(process.env.LOG_RETENTION_DAYS || '7'),

  // Notification Configuration
  ENABLE_SLACK_NOTIFICATIONS: process.env.ENABLE_SLACK_NOTIFICATIONS === 'true',
  ENABLE_EMAIL_NOTIFICATIONS: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  ENABLE_TEAMS_NOTIFICATIONS: process.env.ENABLE_TEAMS_NOTIFICATIONS === 'false',
  NOTIFICATION_FREQUENCY: process.env.NOTIFICATION_FREQUENCY || 'daily',

  // Monitoring Configuration
  ENABLE_MONITORING: process.env.ENABLE_MONITORING === 'true',
  METRICS_COLLECTION: process.env.METRICS_COLLECTION === 'true',
  HEALTH_CHECK_URL: process.env.HEALTH_CHECK_URL || 'https://webable.pihr.xyz/health',
};

// Helper functions for environment-specific configurations
export const getEnvironmentConfig = (environment: string = config.NODE_ENV) => {
  switch (environment) {
    case 'development':
      return {
        ...config,
        PLAYWRIGHT_HEADLESS: false,
        DEBUG_MODE: true,
        LOG_LEVEL: 'debug',
      };
    case 'staging':
      return {
        ...config,
        PLAYWRIGHT_HEADLESS: true,
        DEBUG_MODE: false,
        LOG_LEVEL: 'info',
      };
    case 'production':
      return {
        ...config,
        PLAYWRIGHT_HEADLESS: true,
        DEBUG_MODE: false,
        LOG_LEVEL: 'warn',
        ENABLE_SLACK_NOTIFICATIONS: true,
        ENABLE_EMAIL_NOTIFICATIONS: true,
      };
    default:
      return config;
  }
};

export const getTestData = () => ({
  username: config.TEST_USERNAME,
  password: config.TEST_PASSWORD,
  email: config.TEST_EMAIL,
});

export const getUrls = () => ({
  base: config.BASE_URL,
  login: config.LOGIN_URL,
  dashboard: config.DASHBOARD_URL,
  jobCard: config.JOB_CARD_URL,
  attendance: config.ATTENDANCE_URL,
});

export const getReportingConfig = () => ({
  allureResultsDir: config.ALLURE_RESULTS_DIR,
  allureReportDir: config.ALLURE_REPORT_DIR,
  cucumberReportFile: config.CUCUMBER_REPORT_FILE,
  retentionDays: config.REPORT_RETENTION_DAYS,
});

export const getNotificationConfig = () => ({
  slackWebhookUrl: config.SLACK_WEBHOOK_URL,
  emailServiceUrl: config.EMAIL_SERVICE_URL,
  teamsWebhookUrl: config.TEAMS_WEBHOOK_URL,
  enableSlack: config.ENABLE_SLACK_NOTIFICATIONS,
  enableEmail: config.ENABLE_EMAIL_NOTIFICATIONS,
  enableTeams: config.ENABLE_TEAMS_NOTIFICATIONS,
  frequency: config.NOTIFICATION_FREQUENCY,
});

export default config;

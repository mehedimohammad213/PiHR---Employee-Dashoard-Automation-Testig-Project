import { config, getTestData } from "../config/environment";

export const testData = {
  // Test credentials from environment
  credentials: {
    username: config.TEST_USERNAME,
    password: config.TEST_PASSWORD,
    email: config.TEST_EMAIL,
  },

  // URLs from environment
  urls: {
    base: config.BASE_URL,
    login: config.LOGIN_URL,
    dashboard: config.DASHBOARD_URL,
    jobCard: config.JOB_CARD_URL,
    attendance: config.ATTENDANCE_URL,
  },

  // Date and month data for tests
  dates: {
    startDate: "Tuesday, July 1st,",
    endDate: "Thursday, July 31st,",
    today: new Date().toLocaleDateString(),
    yesterday: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(),
  },

  months: {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },

  // Test scenarios
  scenarios: {
    validLogin: {
      username: config.TEST_USERNAME,
      password: config.TEST_PASSWORD,
      expectedUrl: config.DASHBOARD_URL,
    },
    invalidLogin: {
      username: "invalid_user",
      password: "invalid_password",
      expectedError: "Invalid credentials",
    },
    jobCardDateRange: {
      startDate: "Tuesday, July 1st,",
      endDate: "Thursday, July 31st,",
      month: "July",
      year: "2024",
    },
    attendanceMonth: {
      month: "June",
      year: "2024",
    },
  },

  // Test timeouts
  timeouts: {
    pageLoad: config.PLAYWRIGHT_TIMEOUT,
    elementWait: 10000,
    navigation: 15000,
    download: 30000,
  },

  // Browser settings
  browser: {
    type: config.BROWSER_TYPE,
    width: config.BROWSER_WIDTH,
    height: config.BROWSER_HEIGHT,
    headless: config.PLAYWRIGHT_HEADLESS,
  },

  // Performance thresholds
  performance: {
    pageLoadTime: config.PERFORMANCE_THRESHOLD,
    responseTime: 2000,
    memoryUsage: 512,
  },

  // Test categories
  testCategories: {
    smoke: config.SMOKE_TEST_TAGS,
    regression: config.REGRESSION_TEST_TAGS,
    performance: config.PERFORMANCE_TEST_TAGS,
    security: config.SECURITY_TEST_TAGS,
  },

  // Feature flags
  features: {
    bddTests: config.ENABLE_BDD_TESTS,
    tddTests: config.ENABLE_TDD_TESTS,
    performanceTests: config.ENABLE_PERFORMANCE_TESTS,
    securityTests: config.ENABLE_SECURITY_TESTS,
    allureReporting: config.ENABLE_ALLURE_REPORTING,
  },
};

export const selectors = {
  // Login page selectors
  login: {
    iframe: 'iframe[title="Login Page"]',
    usernameInput: 'input[name="Username/ Mobile"]',
    passwordInput: 'input[name="Password"]',
    rememberMeCheckbox: 'input[name="Remember me"]',
    loginButton: 'button[name="Login"]',
    errorMessage: ".error-message",
  },

  // Dashboard page selectors
  dashboard: {
    employeeMenu: 'p:has-text("Employee") span',
    selfServiceMenu: 'p:has-text("Self Service") span',
    myJobCardButton: 'button[name="My Job Card"]',
    monthlyAttendanceButton: 'button[name="Monthly Attendance"]',
    myScreensMenu: 'p:has-text("My Screens")',
    dashboardButton: 'button[name="Dashboard"]',
    profileImage: 'img[name="profile"]',
    logoutMenuItem: 'menuitem[name="Logout"]',
  },

  // Job Card page selectors
  jobCard: {
    dateRangeInput: 'input[name="Select Date Range"]',
    datePicker: 'dialog[name="Choose Date"]',
    monthDropdown:
      'text="JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember195019"',
    startDateButton: 'dialog[name="Choose Date"] button:first-child',
    endDateButton: 'dialog[name="Choose Date"] button:nth-child(2)',
    pdfReportButton: 'button[name="PDF Report"]',
    exportExcelButton: 'button[name="Export to Excel"]',
  },

  // Attendance page selectors
  attendance: {
    monthSelector: 'input[name="Select Month"]',
    monthDropdown:
      'text="JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember"',
    pdfReportButton: 'button[name="PDF Report"]',
  },

  // Common selectors
  common: {
    loadingSpinner: ".loading-spinner",
    successMessage: ".success-message",
    errorMessage: ".error-message",
    notification: ".notification",
  },
};

// Helper functions
export const getTestCredentials = () => testData.credentials;
export const getTestUrls = () => testData.urls;
export const getTestScenarios = () => testData.scenarios;
export const getTestTimeouts = () => testData.timeouts;
export const getBrowserSettings = () => testData.browser;
export const getPerformanceThresholds = () => testData.performance;
export const getTestCategories = () => testData.testCategories;
export const getFeatureFlags = () => testData.features;

// Environment-specific data
export const getEnvironmentSpecificData = (
  environment: string = config.NODE_ENV
) => {
  switch (environment) {
    case "development":
      return {
        ...testData,
        browser: {
          ...testData.browser,
          headless: false,
        },
        timeouts: {
          ...testData.timeouts,
          pageLoad: 60000, // Longer timeout for development
        },
      };
    case "staging":
      return {
        ...testData,
        browser: {
          ...testData.browser,
          headless: true,
        },
      };
    case "production":
      return {
        ...testData,
        browser: {
          ...testData.browser,
          headless: true,
        },
        performance: {
          ...testData.performance,
          pageLoadTime: 3000, // Stricter performance requirements
        },
      };
    default:
      return testData;
  }
};

export default testData;

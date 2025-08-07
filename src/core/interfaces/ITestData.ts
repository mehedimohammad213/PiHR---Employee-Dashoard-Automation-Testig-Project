/**
 * Interface for user credentials
 */
export interface IUserCredentials {
  username: string;
  password: string;
  email?: string;
  role?: string;
}

/**
 * Interface for test environment configuration
 */
export interface ITestEnvironment {
  name: string;
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
}

/**
 * Interface for test data
 */
export interface ITestData {
  users: {
    valid: IUserCredentials;
    invalid: IUserCredentials;
    admin: IUserCredentials;
    employee: IUserCredentials;
  };
  environments: {
    development: ITestEnvironment;
    staging: ITestEnvironment;
    production: ITestEnvironment;
  };
  testData: {
    [key: string]: any;
  };
}

/**
 * Interface for API test data
 */
export interface IApiTestData {
  endpoints: {
    [key: string]: string;
  };
  headers: {
    [key: string]: string;
  };
  payloads: {
    [key: string]: any;
  };
}

/**
 * Interface for UI test data
 */
export interface IUiTestData {
  selectors: {
    [key: string]: string;
  };
  testValues: {
    [key: string]: string;
  };
  expectedTexts: {
    [key: string]: string;
  };
}

/**
 * Interface for performance test data
 */
export interface IPerformanceTestData {
  loadTest: {
    users: number;
    duration: number;
    rampUp: number;
  };
  stressTest: {
    maxUsers: number;
    duration: number;
    threshold: number;
  };
  benchmark: {
    baseline: number;
    threshold: number;
  };
}

/**
 * Interface for security test data
 */
export interface ISecurityTestData {
  vulnerabilities: {
    [key: string]: string;
  };
  testPayloads: {
    [key: string]: string;
  };
  expectedResponses: {
    [key: string]: string;
  };
}

import { IUserCredentials, ITestData } from '../../src/core/interfaces/ITestData';
import { config } from '../../src/core/config/environment';

/**
 * Test Data Helper class for managing test data
 */
export class TestDataHelper {
  private static instance: TestDataHelper;
  private testData: ITestData;

  private constructor() {
    this.testData = this.initializeTestData();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TestDataHelper {
    if (!TestDataHelper.instance) {
      TestDataHelper.instance = new TestDataHelper();
    }
    return TestDataHelper.instance;
  }

  /**
   * Initialize test data
   */
  private initializeTestData(): ITestData {
    return {
      users: {
        valid: {
          username: config.TEST_USERNAME,
          password: config.TEST_PASSWORD,
          email: config.TEST_EMAIL,
          role: 'employee'
        },
        invalid: {
          username: 'invalid_user',
          password: 'invalid_password',
          email: 'invalid@example.com',
          role: 'employee'
        },
        admin: {
          username: process.env.ADMIN_USERNAME || 'admin',
          password: process.env.ADMIN_PASSWORD || 'admin123',
          email: process.env.ADMIN_EMAIL || 'admin@example.com',
          role: 'admin'
        },
        employee: {
          username: config.TEST_USERNAME,
          password: config.TEST_PASSWORD,
          email: config.TEST_EMAIL,
          role: 'employee'
        }
      },
      environments: {
        development: {
          name: 'development',
          baseUrl: 'http://localhost:3000',
          apiUrl: 'http://localhost:3000/api',
          timeout: 30000,
          retries: 1,
          headless: false
        },
        staging: {
          name: 'staging',
          baseUrl: 'https://staging.pihr.xyz',
          apiUrl: 'https://staging.pihr.xyz/api',
          timeout: 30000,
          retries: 2,
          headless: true
        },
        production: {
          name: 'production',
          baseUrl: 'https://webable.pihr.xyz',
          apiUrl: 'https://webable.pihr.xyz/api',
          timeout: 60000,
          retries: 3,
          headless: true
        }
      },
      testData: {
        // Add your test data here
        sampleText: 'Sample test text',
        longText: 'This is a very long text that exceeds the normal input length for testing purposes',
        specialCharacters: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        numbers: '1234567890',
        unicode: '测试文本 🚀 💻',
        empty: '',
        whitespace: '   ',
        newlines: '\n\n\n'
      }
    };
  }

  /**
   * Get user credentials by type
   */
  public getUserCredentials(type: 'valid' | 'invalid' | 'admin' | 'employee'): IUserCredentials {
    return this.testData.users[type];
  }

  /**
   * Get environment configuration
   */
  public getEnvironment(env: 'development' | 'staging' | 'production') {
    return this.testData.environments[env];
  }

  /**
   * Get test data by key
   */
  public getTestData(key: string): any {
    return this.testData.testData[key];
  }

  /**
   * Generate random test data
   */
  public generateRandomData(type: 'email' | 'username' | 'password' | 'text'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);

    switch (type) {
      case 'email':
        return `test.${timestamp}.${random}@example.com`;
      case 'username':
        return `user_${timestamp}_${random}`;
      case 'password':
        return `pass_${timestamp}_${random}`;
      case 'text':
        return `Test text ${timestamp} ${random}`;
      default:
        return `data_${timestamp}_${random}`;
    }
  }

  /**
   * Generate test data for specific scenarios
   */
  public generateScenarioData(scenario: string): any {
    switch (scenario) {
      case 'login':
        return {
          validCredentials: this.getUserCredentials('valid'),
          invalidCredentials: this.getUserCredentials('invalid'),
          emptyCredentials: { username: '', password: '' }
        };
      case 'registration':
        return {
          newUser: {
            username: this.generateRandomData('username'),
            email: this.generateRandomData('email'),
            password: this.generateRandomData('password')
          }
        };
      case 'profile':
        return {
          profileData: {
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            address: '123 Test Street, Test City, TC 12345'
          }
        };
      default:
        return {};
    }
  }

  /**
   * Load test data from external file
   */
  public async loadTestDataFromFile(filePath: string): Promise<any> {
    try {
      const fs = require('fs').promises;
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading test data from file: ${filePath}`, error);
      return {};
    }
  }

  /**
   * Save test data to file
   */
  public async saveTestDataToFile(data: any, filePath: string): Promise<void> {
    try {
      const fs = require('fs').promises;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error saving test data to file: ${filePath}`, error);
    }
  }

  /**
   * Clean up test data
   */
  public cleanup(): void {
    // Clean up any temporary test data
    this.testData = this.initializeTestData();
  }
}

// Export singleton instance
export const testDataHelper = TestDataHelper.getInstance();

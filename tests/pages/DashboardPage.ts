import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly employeeMenu: Locator;
  readonly selfServiceMenu: Locator;
  readonly myScreensMenu: Locator;
  readonly profileImage: Locator;
  readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeMenu = page.getByRole('paragraph').filter({ hasText: 'Employee' }).locator('span');
    this.selfServiceMenu = page.getByRole('paragraph').filter({ hasText: 'Self Service' }).locator('span');
    this.myScreensMenu = page.getByRole('paragraph').filter({ hasText: 'My Screens' });
    this.profileImage = page.getByRole('img', { name: 'profile', exact: true });
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async navigateToEmployee() {
    await this.employeeMenu.click();
  }

  async navigateToSelfService() {
    await this.selfServiceMenu.click();
  }

  async navigateToMyScreens() {
    await this.myScreensMenu.click();
  }

  async clickDashboard() {
    await this.page.getByRole('button', { name: 'Dashboard' }).click();
  }

  async logout() {
    await this.profileImage.click();
    await this.logoutMenuItem.click();
  }

  async verifyLoggedOut() {
    // Wait for redirect to login page
    await expect(this.page).toHaveURL(/.*login.*/);
  }
}

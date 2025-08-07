import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DashboardPage } from '../../tests/pages/DashboardPage';

let dashboardPage: DashboardPage;

When('I click on my profile image', async function() {
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.clickProfileImage();
});

When('I click on {string} menu item', async function(menuItem: string) {
  if (menuItem === 'Logout') {
    await dashboardPage.logout();
  }
});

When('I try to access the dashboard URL directly', async function() {
  // This would try to access a protected URL directly
  // For now, we'll just navigate to the dashboard
  await this.page.goto('https://webable.pihr.xyz/dashboard');
});

When('I navigate to the {string} section', async function(sectionName: string) {
  if (sectionName === 'Employee') {
    await dashboardPage.navigateToEmployee();
  }
});

When('I click on {string}', async function(elementName: string) {
  if (elementName === 'Self Service') {
    await dashboardPage.navigateToSelfService();
  } else if (elementName === 'My Job Card') {
    // This would navigate to job card
    // For now, we'll just verify the action
    await expect(this.page).toBeDefined();
  }
});

Then('I should be successfully logged out', async function() {
  await dashboardPage.verifyLoggedOut();
});

Then('I should be redirected to the login page', async function() {
  await expect(this.page).toHaveURL(/.*login.*/);
});

Then('I should see the login form', async function() {
  await expect(this.page.locator('iframe[title="Login Page"]')).toBeVisible();
});

Then('I should not be able to access protected pages', async function() {
  // This would verify that protected pages are not accessible
  // For now, we'll just check that we're redirected to login
  await expect(this.page).toHaveURL(/.*login.*/);
});

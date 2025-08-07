import { test, expect } from '@playwright/test';

test('Complete Employee Workflow - Login, Job Card, and Logout', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://webable.pihr.xyz/login');
  await page.waitForLoadState('networkidle');

  const frame = page.locator('iframe[title="Login Page"]').contentFrame();
  if (frame) {
    await frame.locator('input[name="userName"]').click();
    await frame.locator('input[name="userName"]').fill('01830377213');
    await frame.locator('input[name="password"]').click();
    await frame.locator('input[name="password"]').fill('nopass@1234');
    await frame.locator('input[name="password"]').press('Enter');
  }

  // Wait for navigation
  await page.waitForURL('**/employee/**', { timeout: 30000 });

  // Step 2: Navigate to Job Card
  await page.waitForTimeout(3000); // Wait for page to fully load

  // Click Self Service
  await page.locator('p:has-text("Self Service")').click();
  await page.waitForTimeout(2000);

  // Double click Reports
  await page.locator('p:has-text("Reports")').dblclick();
  await page.waitForTimeout(2000);

  // Click My Job Card
  await page.locator('button:has-text("My Job Card")').click();

  // Step 3: Select Date Range
  await page.locator('input[name="Select Date Range"]').waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Select Date Range' }).click();

  await page.locator('dialog[name="Choose Date"]').waitFor({ state: 'visible' });
  await page.getByRole('dialog', { name: 'Choose Date' }).getByRole('button').first().click();

  await page.locator('option[name="Choose Tuesday, July 1st,"]').waitFor({ state: 'visible' });
  await page.getByRole('option', { name: 'Choose Tuesday, July 1st,' }).click();

  await page.locator('listbox[name="Month July,"]').waitFor({ state: 'visible' });
  await page.getByRole('listbox', { name: 'Month July,' }).getByLabel('Choose Thursday, July 31st,').click();

  // Step 4: Generate PDF Report
  await page.locator('button[name="PDF Report"]').waitFor({ state: 'visible' });
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'PDF Report' }).click();
  const page1 = await page1Promise;

  // Step 5: Logout
  await page.locator('img[name="profile"]').waitFor({ state: 'visible' });
  await page.getByRole('img', { name: 'profile' }).click();

  await page.locator('menuitem[name="Logout"]').waitFor({ state: 'visible' });
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Verify logout
  await expect(page).toHaveURL(/.*login/);
});

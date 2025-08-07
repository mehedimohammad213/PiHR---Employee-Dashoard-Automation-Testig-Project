import { test, expect } from '@playwright/test';

test('Navigation Debug Test', async ({ page }) => {
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
  console.log('Current URL after login:', page.url());

  // Step 2: Debug navigation elements
  await page.waitForTimeout(3000); // Wait for page to fully load

  // Check for Self Service menu
  const selfServiceExists = await page.locator('p:has-text("Self Service")').count() > 0;
  console.log('Self Service menu exists:', selfServiceExists);

  if (selfServiceExists) {
    await page.locator('p:has-text("Self Service")').click();
    console.log('Clicked Self Service');

    // Wait a bit and check for Reports menu
    await page.waitForTimeout(2000);
    const reportsExists = await page.locator('p:has-text("Reports")').count() > 0;
    console.log('Reports menu exists:', reportsExists);

    if (reportsExists) {
      await page.locator('p:has-text("Reports")').dblclick();
      console.log('Double clicked Reports');

      // Wait a bit and check for My Job Card button
      await page.waitForTimeout(2000);
      const jobCardExists = await page.locator('button:has-text("My Job Card")').count() > 0;
      console.log('My Job Card button exists:', jobCardExists);

      if (jobCardExists) {
        await page.locator('button:has-text("My Job Card")').click();
        console.log('Clicked My Job Card');
      } else {
        // List all buttons to see what's available
        const allButtons = await page.locator('button').all();
        console.log('Available buttons:');
        for (let i = 0; i < allButtons.length; i++) {
          const button = allButtons[i];
          const text = await button.textContent();
          const name = await button.getAttribute('name');
          console.log(`Button ${i}: text="${text}", name="${name}"`);
        }
      }
    }
  }

  // Take a screenshot
  await page.screenshot({ path: 'navigation-debug.png' });
});

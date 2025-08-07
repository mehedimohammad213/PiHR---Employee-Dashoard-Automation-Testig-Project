import { test, expect } from '@playwright/test';

test('Simple Login Test', async ({ page }) => {
  // Step 1: Go to login page
  await page.goto('https://webable.pihr.xyz/login');
  await page.waitForLoadState('networkidle');

  // Step 2: Check if iframe exists
  const iframeExists = await page.locator('iframe[title="Login Page"]').count() > 0;
  console.log('Iframe exists:', iframeExists);

  if (iframeExists) {
    const frame = page.locator('iframe[title="Login Page"]').contentFrame();
    if (frame) {
      // Step 3: Check what elements are available in the iframe
      const usernameInputs = await frame.locator('input[type="text"]').count();
      const passwordInputs = await frame.locator('input[type="password"]').count();
      console.log('Username inputs found:', usernameInputs);
      console.log('Password inputs found:', passwordInputs);

      // Step 4: Try to find elements by different selectors
      const allInputs = await frame.locator('input').all();
      for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i];
        const name = await input.getAttribute('name');
        const placeholder = await input.getAttribute('placeholder');
        const type = await input.getAttribute('type');
        console.log(`Input ${i}: name="${name}", placeholder="${placeholder}", type="${type}"`);
      }

      // Step 5: Try to interact with the first text input (username)
      if (usernameInputs > 0) {
        const usernameInput = frame.locator('input[type="text"]').first();
        await usernameInput.click();
        await usernameInput.fill('01830377213');
        console.log('Username filled successfully');
      }

      // Step 6: Try to interact with the first password input
      if (passwordInputs > 0) {
        const passwordInput = frame.locator('input[type="password"]').first();
        await passwordInput.click();
        await passwordInput.fill('nopass@1234');
        await passwordInput.press('Enter');
        console.log('Password filled and Enter pressed');
      }
    }
  }

  // Step 7: Wait a bit to see if login worked
  await page.waitForTimeout(5000);

  // Step 8: Check current URL
  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);

  // Step 9: Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png' });
});

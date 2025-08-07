import { Page, Locator, expect } from '@playwright/test';

export class MonthlyAttendancePage {
  readonly page: Page;
  readonly monthlyAttendanceButton: Locator;
  readonly monthSelector: Locator;
  readonly pdfReportButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.monthlyAttendanceButton = page.getByRole('button', { name: 'Monthly Attendance', exact: true });
    this.monthSelector = page.getByRole('textbox', { name: 'Select Month' });
    this.pdfReportButton = page.getByRole('button', { name: 'PDF Report' });
  }

  async navigateToMonthlyAttendance() {
    await this.monthlyAttendanceButton.click();
  }

  async selectMonth(month: string) {
    await this.monthSelector.click();
    await this.page.getByText(month).click();
  }

  async generatePDFReport() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.pdfReportButton.click();
    const popup = await popupPromise;
    return popup;
  }

  async verifyMonthlyAttendancePage() {
    await expect(this.monthlyAttendanceButton).toBeVisible();
  }
}

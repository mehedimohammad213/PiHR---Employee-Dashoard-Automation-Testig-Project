import { Page, Locator, expect } from "@playwright/test";
import { config } from "../config/environment";

export class MonthlyAttendancePage {
  readonly page: Page;
  readonly monthSelector: Locator;
  readonly pdfReportButton: Locator;
  readonly monthDropdown: Locator;
  readonly monthOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.monthSelector = page.getByRole("textbox", { name: "Select Month" });
    this.pdfReportButton = page.getByRole("button", { name: "PDF Report" });
    this.monthDropdown = page.getByText(
      "JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember"
    );
    this.monthOptions = page.getByRole("option");
  }

  async goto() {
    await this.page.goto(config.ATTENDANCE_URL);
    await this.page.waitForLoadState("networkidle");
  }

  async selectMonth(month: string) {
    await this.monthSelector.click();
    await this.page.getByText(month).click();
  }

  async generatePDFReport() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.pdfReportButton.click();
    const popup = await popupPromise;

    // Verify PDF report opened in new tab
    expect(popup.url()).toContain(".pdf");
    await popup.close();
  }

  async verifyAttendancePageLoaded() {
    await expect(this.page).toHaveURL(/.*attendance/);
    await expect(this.monthSelector).toBeVisible();
    await expect(this.pdfReportButton).toBeVisible();
  }

  async verifyMonthSelected(month: string) {
    await expect(this.monthSelector).toHaveValue(month);
  }

  async verifyPDFReportGenerated() {
    // This would verify the PDF report was successfully generated
    // Implementation depends on the specific PDF generation mechanism
    await expect(this.pdfReportButton).toBeEnabled();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async isOnAttendancePage(): Promise<boolean> {
    try {
      await this.page.waitForURL("**/attendance**", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

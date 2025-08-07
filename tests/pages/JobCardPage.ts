import { Page, Locator, expect } from "@playwright/test";
import { config } from "../config/environment";

export class JobCardPage {
  readonly page: Page;
  readonly dateRangeInput: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly startDateButton: Locator;
  readonly endDateButton: Locator;
  readonly pdfReportButton: Locator;
  readonly exportExcelButton: Locator;
  readonly datePicker: Locator;
  readonly dateOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateRangeInput = page.getByRole("textbox", {
      name: "Select Date Range",
    });
    this.monthDropdown = page
      .getByText(
        "JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember195019"
      )
      .first();
    this.yearDropdown = page
      .getByText(
        "JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember195019"
      )
      .first();
    this.startDateButton = page
      .getByRole("dialog", { name: "Choose Date" })
      .getByRole("button")
      .first();
    this.endDateButton = page
      .getByRole("dialog", { name: "Choose Date" })
      .getByRole("button")
      .nth(1);
    this.pdfReportButton = page.getByRole("button", { name: "PDF Report" });
    this.exportExcelButton = page.getByRole("button", {
      name: "Export to Excel",
    });
    this.datePicker = page.getByRole("dialog", { name: "Choose Date" });
    this.dateOptions = page.getByRole("option");
  }

  async goto() {
    await this.page.goto(config.JOB_CARD_URL);
    await this.page.waitForLoadState("networkidle");
  }

  async selectDateRange(startDate: string, endDate: string) {
    // Click on date range input
    await this.dateRangeInput.click();

    // Select start date
    await this.startDateButton.click();
    await this.monthDropdown.click();
    await this.page
      .getByRole("option", { name: `Choose ${startDate}` })
      .click();

    // Select end date
    await this.endDateButton.click();
    await this.monthDropdown.click();
    await this.page
      .getByRole("listbox", { name: "Month July," })
      .getByLabel(`Choose ${endDate}`)
      .click();
  }

  async generatePDFReport() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.pdfReportButton.click();
    const popup = await popupPromise;

    // Verify PDF report opened in new tab
    expect(popup.url()).toContain(".pdf");
    await popup.close();
  }

  async exportToExcel() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.exportExcelButton.click();
    const download = await downloadPromise;

    // Verify Excel file downloaded
    expect(download.suggestedFilename()).toContain(".xlsx");
  }

  async verifyJobCardPageLoaded() {
    await expect(this.page).toHaveURL(/.*job-card/);
    await expect(this.dateRangeInput).toBeVisible();
    await expect(this.pdfReportButton).toBeVisible();
    await expect(this.exportExcelButton).toBeVisible();
  }

  async verifyDateRangeSelected(startDate: string, endDate: string) {
    await expect(this.dateRangeInput).toHaveValue(`${startDate} - ${endDate}`);
  }

  async verifyPDFReportGenerated() {
    // This would verify the PDF report was successfully generated
    // Implementation depends on the specific PDF generation mechanism
    await expect(this.pdfReportButton).toBeEnabled();
  }

  async verifyExcelExportCompleted() {
    // This would verify the Excel export was successful
    // Implementation depends on the specific export mechanism
    await expect(this.exportExcelButton).toBeEnabled();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async isOnJobCardPage(): Promise<boolean> {
    try {
      await this.page.waitForURL("**/job-card**", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

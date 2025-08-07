import { Page, Locator, expect } from "@playwright/test";

export class JobCardPage {
  readonly page: Page;
  readonly myJobCardButton: Locator;
  readonly dateRangeSelector: Locator;
  readonly dateDialog: Locator;
  readonly monthSelector: Locator;
  readonly pdfReportButton: Locator;
  readonly exportToExcelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myJobCardButton = page.getByRole("button", { name: "My Job Card" });
    this.dateRangeSelector = page.getByRole("textbox", {
      name: "Select Date Range",
    });
    this.dateDialog = page.getByRole("dialog", { name: "Choose Date" });
    this.monthSelector = page
      .getByText(
        "JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember195019"
      )
      .first();
    this.pdfReportButton = page.getByRole("button", { name: "PDF Report" });
    this.exportToExcelButton = page.getByRole("button", {
      name: "Export to Excel",
    });
  }

  async navigateToJobCard() {
    await this.myJobCardButton.click();
  }

  async selectDateRange(startDate: string, endDate: string) {
    // Click on date range selector
    await this.dateRangeSelector.click();

    // Select start date
    await this.dateDialog.getByRole("button").first().click();
    await this.monthSelector.click();
    await this.page.getByRole("option", { name: startDate }).click();

    // Select end date
    await this.dateDialog.getByRole("button").nth(1).click();
    await this.monthSelector.click();
    await this.page
      .getByRole("listbox", { name: "Month July," })
      .getByLabel(endDate)
      .click();
  }

  async generatePDFReport() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.pdfReportButton.click();
    const popup = await popupPromise;
    return popup;
  }

  async exportToExcel() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.exportToExcelButton.click();
    const download = await downloadPromise;
    return download;
  }

  async verifyJobCardPage() {
    await expect(this.myJobCardButton).toBeVisible();
  }
}

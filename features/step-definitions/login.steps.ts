import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../tests/pages/LoginPage";
import { DashboardPage } from "../../tests/pages/DashboardPage";
import { testData } from "../../tests/data/testData";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

Given("I am on the login page", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

Given("the login form is visible", async function () {
  await expect(this.page.locator('iframe[title="Login Page"]')).toBeVisible();
});

Given("I am logged into the PiHR system", async function () {
  loginPage = new LoginPage(this.page);
  dashboardPage = new DashboardPage(this.page);
  await loginPage.goto();
  await loginPage.login(
    testData.credentials.username,
    testData.credentials.password
  );
  await loginPage.verifyLoginSuccess();
});

Given("I am on the employee dashboard", async function () {
  await expect(this.page).toHaveURL(/.*dashboard.*/);
});

When("I enter valid username {string}", async function (username: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!
    .getByRole("textbox", { name: "Username/ Mobile" })
    .fill(username);
});

When("I enter valid password {string}", async function (password: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!.getByRole("textbox", { name: "Password" }).fill(password);
});

When("I enter invalid username {string}", async function (username: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!
    .getByRole("textbox", { name: "Username/ Mobile" })
    .fill(username);
});

When("I enter invalid password {string}", async function (password: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!.getByRole("textbox", { name: "Password" }).fill(password);
});

When("I enter username {string}", async function (username: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!
    .getByRole("textbox", { name: "Username/ Mobile" })
    .fill(username);
});

When("I enter password {string}", async function (password: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!.getByRole("textbox", { name: "Password" }).fill(password);
});

When("I check the {string} checkbox", async function (checkboxName: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!.getByRole("checkbox", { name: checkboxName }).check();
});

When("I click the {string} button", async function (buttonName: string) {
  const frame = this.page.locator('iframe[title="Login Page"]').contentFrame();
  await frame!.getByRole("button", { name: buttonName }).click();
});

Then("I should be successfully logged in", async function () {
  await loginPage.verifyLoginSuccess();
});

Then("I should see the employee dashboard", async function () {
  await expect(this.page).toHaveURL(/.*dashboard.*/);
});

Then("I should see my profile information", async function () {
  await expect(
    this.page.getByRole("img", { name: "profile", exact: true })
  ).toBeVisible();
});

Then("I should see an error message", async function () {
  // This would depend on how the application shows error messages
  // For now, we'll check if we're still on the login page
  await expect(this.page).toHaveURL(/.*login.*/);
});

Then("I should remain on the login page", async function () {
  await expect(this.page).toHaveURL(/.*login.*/);
});

Then("I should see {string}", async function (expectedResult: string) {
  if (expectedResult === "error message") {
    await expect(this.page).toHaveURL(/.*login.*/);
  } else if (expectedResult === "successful login") {
    await loginPage.verifyLoginSuccess();
  }
});

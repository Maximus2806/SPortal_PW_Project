import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page.js";
import { CustomersListPage } from "../pages/customers/customers.page.js";
import { logStep } from "../../utils/report/logStep.js";
import { PAGES } from "../../data/types/pageTitle.types.js";

export class HomeService {
  private homePage: HomePage;
  private customersPage: CustomersListPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
  }

  @logStep()
  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton(PAGES.CUSTOMERS);
    await this.homePage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }
}
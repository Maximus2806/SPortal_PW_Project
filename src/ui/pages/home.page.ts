// import { SalesPortalPage } from "./salesPortal.page.js";

// export class HomePage extends SalesPortalPage {
//   uniqueElement = '//strong[.="AQA User"]';

//   readonly "Orders button" = this.findElement("#orders-from-home");
//   readonly "Products button" = this.findElement("#products-from-home");
//   readonly "Customers button" = this.findElement("#customers-from-home");

//   async clickOnViewDetailsButton(moduleName: "Products" | "Customers" | "Orders") {
//     await this.click(this[`${moduleName} button`]);
//   }
// }

import { PAGES } from '../../data/types/pageTitle.types.js';
import { SalesPortalPage } from './salesPortal.page.js';

export class HomePage extends SalesPortalPage {
  readonly uniqueElement = 'div#myCarousel';
  private readonly 'Home from sidebar' = "//a[text()[normalize-space() = 'Home']]";
  private readonly 'Orders from sidebar' = "//a[text()[normalize-space() = 'Orders']]";
  private readonly 'Products from sidebar' = "//a[text()[normalize-space() = 'Products']]";
  private readonly 'Customers from sidebar' = "//a[text()[normalize-space() = 'Customers']]";
  private readonly 'Profile menu' = '#dropdownUser1';
  private readonly 'Sign out button' = '#signOut';

  async openPage(pageTitle: PAGES) {
    await this.click(this[`${pageTitle} from sidebar`]);
    await this.waitForSpinnerToHide();
  }

  async signOut() {
    await this.click(this['Profile menu']);
    await this.click(this['Sign out button']);
  }

  async clickOnViewDetailsButton(pageTitle: PAGES) {
    await this.click(this[`${pageTitle} from sidebar`]);
  }
}

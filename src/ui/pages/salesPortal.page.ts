import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.findElement('.spinner-border');
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 'hidden');
  }

  async getHeaderPosition(header: string) {
    const elements = await this.findElements(`//thead//th`);
    const elementsArray = await Promise.all(elements.map(async (el) => await this.getText(el)));
    return elementsArray.length ? elementsArray.indexOf(header) + 1 : -1;
  }
}

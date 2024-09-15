import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.findElement('.spinner-border');
  protected readonly toast = '#toast .toast-body';
  protected readonly 'Close toast message' = 'button[title="Close"]';
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 'hidden');
  }
  async getNotificationMessage() {
    const toastMessage = await this.getText(this.toast);
    return toastMessage;
  }

  async closeToastMessage() {
    await this.click(this['Close toast message']);
  }

  async getHeaderPosition(header: string) {
    const elements = await this.findElements(`//thead//th`);
    const elementsArray = await Promise.all(elements.map(async (el) => (await this.getText(el)).toLowerCase()));
    return elementsArray.length ? elementsArray.indexOf(header.trim().toLowerCase()) + 1 : -1;
  }
}

import { expect } from 'playwright/test';
import { TOAST_MESSAGE } from '../../data/types/toastMessage.types.js';
import { SalesPortalPage } from '../pages/salesPortal.page.js';

export class SalesPortalService {
  constructor(private salesPortalPage: SalesPortalPage) {}

  async verifyNotification(expectedMessage: TOAST_MESSAGE) {    
    const actualMessage = await this.salesPortalPage.getToastMessage();    
    expect(actualMessage).toBe(expectedMessage);
    await this.salesPortalPage.closeToastMessage()
  }
}

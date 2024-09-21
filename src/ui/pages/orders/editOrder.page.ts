import { ICustomerDetails, IOrderDetails, IRequestedProductDetails } from '../../../data/types/orders.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class EditOrderPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Order Details"]';
  private readonly 'Key details' = (key) => `//*[contains(@class,'fw-bold') and text()='${key}']/following-sibling::*[text()]`;
  private readonly 'Refresh order button' = `#refresh-order`;
  private readonly 'Accordion section' = `#products-accordion-section`;
  private readonly 'Accordion button' = (name) => `//button[@class="accordion-button" and normalize-space(.//text())='${name}']`;


async getOrderDetails(): Promise<IOrderDetails> {
  const [orderNumber, assignedManager, totalPrice, orderStatus, delivery, createdOn] = await Promise.all([
    this.getText(this['Key details']('Order number: ')),
    this.getText(this['Key details']('Assigned Manager: ')),
    this.getText(this['Key details']('Total Price')),
    this.getText(this['Key details']('Order Status')),
    this.getText(this['Key details']('Delivery')),
    this.getText(this['Key details']('Created On: '))
  ]);

  return {
    orderNumber,
    assignedManager,
    totalPrice,
    orderStatus,
    delivery,
    createdOn
  };
}


  async getCustomerDetails(): Promise<ICustomerDetails> {
    return {
        email: await this.getText(this['Key details']('Email: ')),
        name: await this.getText(this['Key details']('Name: ')),
        country: await this.getText(this['Key details']('Country: ')),
        city: await this.getText(this['Key details']('City: ')),
        street: await this.getText(this['Key details']('Street: ')),
        house: await this.getText(this['Key details']('House: ')),
        flat: await this.getText(this['Key details']('Flat: ')),
        phone: await this.getText(this['Key details']('Phone: ')),
        createdOn: await this.getText(this['Key details']('Created On: ')),
        notes: await this.getText(this['Key details']('Notes: ')),
    }
  }

  async refreshOrder() {
    await this.click(this['Refresh order button']);
  }

  async getRequestedProductDetails(): Promise<IRequestedProductDetails> {
    return {
        name: await this.getText(this['Key details']('Name')),  
        price: await this.getText(this['Key details']('Price')),
        manufacturer: await this.getText(this['Key details']('Manufacturer')),
        notes: await this.getText(this['Key details']('Notes')),
    }
  }

  async collapseRequstedProduct(name: string, collapse: boolean) {
    collapse.toString() !== await this.getElementAttribute(this['Accordion button'](name), 'aria-expanded')
    && await this.click(this['Accortion button'](name))
  }

}

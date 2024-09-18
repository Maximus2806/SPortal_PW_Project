import { IProduct } from '../../../data/types/product.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export abstract class ProductFormPage extends SalesPortalPage {
  protected readonly 'Name input' = '#inputName';
  protected readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
  protected readonly 'Price input' = '#inputPrice';
  protected readonly 'Amount input' = '#inputAmount';
  protected readonly 'Notes textarea' = '#textareaNotes';
  protected readonly 'Back to product page button' = '#back-to-products-page';

  async fillInputs(product: Partial<IProduct>) {
    if (product.name) await this.setValue(this['Name input'], product.name);
    if (product.manufacturer) await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    if (product.price !== undefined) await this.setValue(this['Price input'], product.price);
    if (product.amount !== undefined) await this.setValue(this['Amount input'], product.amount);
    if (product.notes) await this.setValue(this['Notes textarea'], product.notes);
  }

  async clickOnBackButton() {
    await this.click(this['Back to product page button']);
  }
}

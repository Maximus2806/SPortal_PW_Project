import { ProductFormPage } from './productForm.page.js';

export class AddNewProductPage extends ProductFormPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';

  private readonly 'Save New Product button' = '#save-new-product';
  private readonly 'Clear all button' = '#clear-inputs';

  async clickOnSaveButton() {
    await this.click(this['Save New Product button']);
  }
  
  async clickOnClearAllButton() {
    await this.click(this['Clear all button']);
  }
}

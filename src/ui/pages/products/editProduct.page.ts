import { ProductFormPage } from './productForm.page.js';

export class EditProductPage extends ProductFormPage {
  readonly uniqueElement = '//h2[starts-with(., "Edit ")]';

  private readonly 'Save Changes button' = '#save-product-changes';
  private readonly 'Delete product button' = '#delete-product-btn';

  async clickOnSaveChangesButton() {
    await this.click(this['Save Changes button']);
  }

  async clickOnDeleteButton() {
    await this.click(this['Delete product button']);
  }
}

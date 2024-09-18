import { expect, Page } from '@playwright/test';
import { IProduct } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/logStep.js';
import { DeleteModalPage } from '../../pages/modals/deleteModal.page.js';
import { ProductDetailsModalPage } from '../../pages/modals/productDetailsModal.page.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsListPage } from '../../pages/products/products.page.js';
import _ from 'lodash';
import { EditProductPage } from '../../pages/products/editProduct.page.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';

export class ProductsListService {
  private productsPage: ProductsListPage;
  private addNewProductPage: AddNewProductPage;
  private modalWindowPage: ProductDetailsModalPage;
  private deleteModalPage: DeleteModalPage;
  private editProductPage: EditProductPage;
  constructor(protected page: Page) {
    this.productsPage = new ProductsListPage(page),
    this.addNewProductPage = new AddNewProductPage(page),
    this.modalWindowPage = new ProductDetailsModalPage(page),
    this.deleteModalPage = new DeleteModalPage(page);
    this.editProductPage = new EditProductPage(page);
  }

  @logStep('Open add new product page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep('Get created product data')
  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }

  private async openDetails(productName: string) {
    await this.productsPage.clickOnDetailsButton(productName);
  }

  private async openEditForm(productName: string) {
    await this.productsPage.clickOnEditButton(productName);
  }

  @logStep('Get product details info from modal window')
  async getCreatedProductDetails(productName: string) {
    await this.openDetails(productName);
    await this.productsPage.waitForSpinnerToHide();       
    const productData = await this.modalWindowPage.getProductData();
    await this.modalWindowPage.clickCrossButton();
    return productData;
  }

  @logStep('Edit created product')
  async editCreatedProduct(productName: string, product: Partial<IProduct>){
    await this.openEditForm(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.editProductPage.waitForOpened();    
    await this.editProductPage.fillInputs(product);    
    await this.editProductPage.clickOnSaveChangesButton();
    const actualMessage = await this.productsPage.getNotificationMessage();
    expect(actualMessage).toBe(PRODUCTS_TOAST_MESSAGE.EDIT_SUCCESS);
  }

  @logStep('Delete created product')
  async deleteCreatedProduct(productName: string) {
    await this.productsPage.clickOnDeleteButton(productName);
    await this.deleteModalPage.clickActionButton();
  }

  @logStep('Validate product in table')
  async checkProductInTable(product: IProduct) {
    const actualProduct = await this.getCreatedProductData(product.name);
    const expectedProduct = _.pick(product, ['name', 'price', 'manufacturer']);
    expect(actualProduct).toMatchObject(expectedProduct);
  }

  @logStep('Validate product in modal window')
  async checkProductByModalData(product: IProduct) {
    const actualProduct = await this.getCreatedProductData(product.name);
    const expectedProductFromModal = _.omit(await this.getCreatedProductDetails(product.name), [
      'amount',
      'createdOn',
      'notes'
    ]);
    expect(actualProduct).toMatchObject(expectedProductFromModal);
  }
  
}

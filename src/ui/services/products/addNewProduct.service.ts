import { expect, Page } from '@playwright/test';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct, IProductResponse } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/logStep.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsListPage } from '../../pages/products/products.page.js';
import { apiConfig } from '../../../config/apiConfig.js';
import { IResponse, IResponseFields, STATUS_CODES } from '../../../data/types/api.types.js';
import { validateResponse } from '../../../utils/validation/response.js';

export class AddProductService {
  private productsPage: ProductsListPage;
  private addNewProductPage: AddNewProductPage;

  constructor(protected page: Page) {
    (this.productsPage = new ProductsListPage(page)), (this.addNewProductPage = new AddNewProductPage(page));
  }

  @logStep('Fill product inputs')
  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  @logStep('Save new product')
  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }

  @logStep('Create product')
  async create(product?: IProduct) {
    const productData = product ?? generateNewProduct();
    await this.fillProductInputs(productData);    
    const responseUrl = apiConfig.baseUrl + apiConfig.endpoints.Products;
    const response = await this.addNewProductPage.interceptResponse<IProductResponse>(
      responseUrl,
      this.save.bind(this)
    );
    validateResponse<IProductResponse>(response, STATUS_CODES.CREATED, true, null);
    expect(response.body.Product).toMatchObject({
      ...productData,
      createdOn: response.body.Product.createdOn,
      _id: response.body.Product._id
    });
    await this.addNewProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
    return response.body.Product;
  }
}

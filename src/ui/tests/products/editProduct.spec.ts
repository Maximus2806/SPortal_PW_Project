import { test } from '../../../fixtures/services.fixture.js';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';
import { IProduct, IProductResponse } from '../../../data/types/product.types.js';
import productApiClient from '../../../api/products/product.client.js';
import signInApiService from '../../../api/service/signIn.api';
import { IResponse } from '../../../data/types/api.types.js';

test.describe('[UI] [Product] Edit Product', async function () {
  let productName: string;
  let product: IProduct;  
  let response: IResponse<IProductResponse>;
  let productId: string;

  test.beforeEach(async function ({ signInPageService, homePageService }) {    
    product = generateNewProduct();
    response = await productApiClient.create(product, await signInApiService.getToken());    
    productName = product.name;
    productId = response.body.Product._id
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPage();
  });

  test.afterEach(async function () {
    if (productId) await productApiClient.delete(productId, await signInApiService.getToken());
  });
  test('Test Edit product providing random data', async ({
    productsPageService,        
    salesPortalService
  }) => {
    const newProduct = generateNewProduct();
    await productsPageService.editCreatedProduct(productName, newProduct);    
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.EDIT_SUCCESS);        
    await productsPageService.checkProductByModalData(newProduct);
  });
});

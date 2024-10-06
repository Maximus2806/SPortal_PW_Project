import { test } from '../../../fixtures/services.fixture.js';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types.js';
import productApiClient from '../../../api/products/product.client.js';
import signInApiService from '../../../api/service/signIn.api';

test.describe('[UI] [Product] Create Product', async function () {
  let productName: string;
  let product: IProduct;
  let productId:string;
  let productBody: IProductFromResponse;

  test.beforeEach(async function ({ signInPageService, homePageService }) {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPage();
    product = generateNewProduct();
    productName = product.name;    
  });

  test.afterEach(async function () {
    if (productId) await productApiClient.delete(productId, await signInApiService.getToken())    
  });
  test('Test Create product with random data', async ({
    productsPageService,
    addNewProductPageService,
    salesPortalService    
  }) => {
    await productsPageService.openAddNewProductPage();
    productBody = await addNewProductPageService.create(product);
    productId = productBody._id;
    console.log(productId) 
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.CREATE_SUCCESS);    
    await productsPageService.checkProductByModalData(product);    
  });
});

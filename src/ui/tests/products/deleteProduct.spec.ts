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
    productName = product.name;
    response = await productApiClient.create(product, await signInApiService.getToken());
    productId = response.body.Product._id;
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPage();
  });

  test('Test Delete product from products list', async ({ productsPageService, salesPortalService }) => {
    await productsPageService.deleteCreatedProduct(productName);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.DELETE_SUCCESS);
    //TODO: getById method and verify abscence of the product in DB
  });
});

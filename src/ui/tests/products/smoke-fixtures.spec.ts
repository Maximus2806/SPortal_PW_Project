import { test } from '../../../fixtures/services.fixture';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';

test.describe('[UI] [Product] Smoke Products', async function () {
  test.beforeEach(async function ({ signInPageService, homePageService }) {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPage();
  });
  test('Test Create - Verify - Delete', async ({
    productsPageService,
    addNewProductPageService,
    salesPortalService
  }) => {
    const product = generateNewProduct();
    await productsPageService.openAddNewProductPage();
    await addNewProductPageService.create(product);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.CREATE_SUCCESS);
    await productsPageService.checkProductByModalData(product);
    await productsPageService.deleteCreatedProduct(product.name);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.DELETE_SUCCESS);
  });
  test('Test Create - Edit - Verify - Delete', async ({ productsPageService, addNewProductPageService, salesPortalService }) => {
    const product = generateNewProduct();    
    await productsPageService.openAddNewProductPage();    
    await addNewProductPageService.create(product);    
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.CREATE_SUCCESS);
    const newProduct = generateNewProduct();    
    await productsPageService.editCreatedProduct(product.name, newProduct);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.EDIT_SUCCESS);
    await productsPageService.deleteCreatedProduct(newProduct.name);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.DELETE_SUCCESS);
  });
});

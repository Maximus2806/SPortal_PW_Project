import { test } from '../../../fixtures/services.fixture';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';
import _ from 'lodash';
import { SalesPortalService } from '../../services/salesPortal.service.js';
import { ProductsListPage } from '../../pages/products/products.page.js';

test.describe('[UI] [Product] Smoke Login - Create -Verify - Delete', async function () {
  let productsPage: ProductsListPage;

  test.beforeEach(async function ({ signInPageService, page }) {
    productsPage = new ProductsListPage(page);
    await signInPageService.openSalesPortal();
  });

  test('Test', async ({ homePageService, productsPageService, addNewProductPageService }) => {
    const product = generateNewProduct();
    const salesPortalService = new SalesPortalService(productsPage);
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
    await addNewProductPageService.create(product);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.CREATE_SUCCESS);
    await productsPageService.checkProductByModalData(product);
    await productsPageService.deleteCreatedProduct(product.name);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.DELETE_SUCCESS);
  });
});

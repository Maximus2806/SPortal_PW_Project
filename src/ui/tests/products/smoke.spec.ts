import { test } from '@playwright/test';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { SignInService } from '../../services/signIn.service';
import { ProductsListService } from '../../services/products/product.service.js';
import { HomeService } from '../../services/home.service';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';
import _ from 'lodash';
import { SalesPortalService } from '../../services/salesPortal.service.js';
import { ProductsListPage } from '../../pages/products/products.page.js';

test.describe('[UI] [Product] Smoke Login - Create -Verify - Delete', async function () {
  let signInService: SignInService;
  let homeService: HomeService;
  let productsService: ProductsListService;
  let addProductService: AddProductService;
  let productsPage: ProductsListPage;
  let salesPortalService: SalesPortalService;

  test.beforeEach(async function ({ page }) {
    signInService = new SignInService(page);
    homeService = new HomeService(page);
    productsService = new ProductsListService(page);
    addProductService = new AddProductService(page);
    productsPage = new ProductsListPage(page);
    await signInService.openSalesPortal();
    //signInService is here just for debugging in case auth.setup.ts is disabled
    // await signInService.loginAsAdmin();
  });

  test('Test', async () => {
    const product = generateNewProduct();
    const salesPortalService = new SalesPortalService(productsPage);
    await homeService.openProductsPage();
    await productsService.openAddNewProductPage();
    await addProductService.create(product);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.CREATE_SUCCESS);
    await productsService.checkProductByModalData(product);
    await productsService.deleteCreatedProduct(product.name);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.DELETE_SUCCESS);
  });
});

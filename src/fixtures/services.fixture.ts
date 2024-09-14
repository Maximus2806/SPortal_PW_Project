import { AddCustomerService } from '../ui/services/customers/addNewCustomer.service';
import { CustomersListService } from '../ui/services/customers/customers.service';
import { AddProductService } from '../ui/services/products/addNewProduct.service';
import { ProductsListService} from '../ui/services/products/product.service';
import { HomeService } from '../ui/services/home.service';
import { SignInService } from '../ui/services/signIn.service';
import { CustomersApiService } from '../api/service/customers.service';
import { test as base } from '@playwright/test';

interface ISalesPortalServices {
  customersPageService: CustomersListService;
  addNewCustomerPageService: AddCustomerService;
  productsPageService: ProductsListService;
  addNewProductPageService: AddProductService;
  homePageService: HomeService;
  signInPageService: SignInService;
  customersApiService: CustomersApiService;
}

export const test = base.extend<ISalesPortalServices>({
  customersPageService: async ({ page }, use) => {
    await use(new CustomersListService(page));
  },

  productsPageService: async ({page}, use) => {
    await use(new ProductsListService(page));
  },

  homePageService: async ({ page }, use) => {
    await use(new HomeService(page));
  },

  signInPageService: async ({ page }, use) => {
    await use(new SignInService(page));
  },

  addNewCustomerPageService: async ({ page }, use) => {
    await use(new AddCustomerService(page));
  },

  addNewProductPageService: async ({ page }, use) => {
    await use(new AddProductService(page));
  },

  customersApiService: async ({}, use) => {
    await use(new CustomersApiService());
  }
});

// import { SignInApiClient } from "../../../api/clients/signIn.client";
// import { apiConfig } from "../../../config/apiConfig";
// import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
// import { ILoginResponse } from "../../../data/types/user.types";
// import { RequestApi } from "../../../utils/apiClients/request";
import { test as setup } from "../../../fixtures/services.fixture";
import signInApiService from "../../../api/service/signIn.api";

const authFile = "src/.auth/user.json";

// setup("Should login with valid credentials", async ({ page, signInPageService }) => {
//   await signInPageService.openSalesPortal();
//   await signInPageService.loginAsAdmin();
//   await page.context().storageState({ path: authFile });
// });

setup("Should login with valid credentials", async ({ page, request }) => {
  // const response = await request.fetch(apiConfig.baseUrl + apiConfig.endpoints.Login, {
  //   method: "post",
  //   headers: { "content-type": "application/json" },
  //   data: {
  //     username: ADMIN_USERNAME,
  //     password: ADMIN_PASSWORD,
  //   },
  // });
  // const api = new RequestApi();
  // const response = await api.send<ILoginResponse>({
  //   method: "post",
  //   url: apiConfig.endpoints.Login,
  //   data: {
  //     username: ADMIN_USERNAME,
  //     password: ADMIN_PASSWORD,
  //   },
  //   headers: { "content-type": "application/json" },
  // });

  // const signIn = new SignInApiClient();
  // const response = await signIn.login({
  //   username: ADMIN_USERNAME,
  //   password: ADMIN_PASSWORD,
  // });

  const token = await signInApiService.loginAsAdmin();
  await page.context().addCookies([
    {
      name: "Authorization",
      value: token,
      url: "https://anatoly-karpovich.github.io/aqa-course-project/",
    },
  ]);

  await page.context().storageState({ path: authFile });
});

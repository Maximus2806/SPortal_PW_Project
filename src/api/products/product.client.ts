import { apiConfig } from '../../config/apiConfig';
import { IProduct, IProductResponse } from '../../data/types/product.types';
import { RequestApi } from '../../utils/apiClients/request';

class ProductApiClient {
  constructor(private request = new RequestApi()) {}

  async create(body: IProduct, token: string) {
    return await this.request.send<IProductResponse>({
      url: apiConfig.endpoints.Products,
      method: 'post',
      data: body,
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    });
  }

  async delete(id: string, token: string) {
    return await this.request.sendWithoutBody({
        url: apiConfig.endpoints.Products + id,
        method: 'delete',
        headers: {            
            Authorization: token
          }
    })
  }
}

export default new ProductApiClient();
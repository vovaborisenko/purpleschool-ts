import { AxiosError } from 'axios';
import { HttpRequestBuilder } from "../12-builder";

interface Product {
    id: number;
}

interface ResponseError {
    message: string;
}

interface IProductApi {
    getItemById(id: number): Promise<Product>;
}

class ProductsApiProxy implements IProductApi {
    constructor(private api: IProductApi) { }

    getItemById(id: number): Promise<Product> {
        if (id > 10) {
            return Promise.reject('Id больше 10');
        }

        return this.api.getItemById(id);
    }
}

class ProductsApi implements IProductApi {
    async getItemById(id: number): Promise<Product> {
        try {
            const { data } = await new HttpRequestBuilder<
                Product,
                null
            >(`https://dummyjson.com/products/${id}`)
                .exec();

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const { response } = error as AxiosError<ResponseError>;

                console.error(response?.data.message);

                return Promise.reject(response?.data.message);
            }

            if (error instanceof Error) {
                console.error(error.message);

                return Promise.reject(error.message);;
            }

            console.debug(error);

            return Promise.reject(error);
        }

    }
}

const api = new ProductsApi();
api.getItemById(11).then(console.log).catch(console.error);
api.getItemById(2).then(console.log).catch(console.error);

const apiProxy = new ProductsApiProxy(new ProductsApi());
apiProxy.getItemById(11).then(console.log).catch(console.error);
apiProxy.getItemById(2).then(console.log).catch(console.error);

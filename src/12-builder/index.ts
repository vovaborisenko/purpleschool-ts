import axios, { AxiosResponse } from 'axios';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export class HttpRequestBuilder<R = any, D = any> {
    private method: Method = Method.GET;
    private data: D;
    private headers: Record<string, string> = {};

    constructor(private url: string) { }

    addMethod(method: Method): this {
        this.method = method;
        return this;
    }

    addData(data: D): this {
        this.data = data;
        return this;
    }

    addHeader(header: string, value: string): this {
        this.headers[header] = value;
        return this;
    }

    exec(): Promise<AxiosResponse<R, D>> {
        return axios<R, AxiosResponse<R>, D>(this.url, {
            method: this.method,
            data: this.data,
            headers: this.headers
        });
    }
}

const httpRequest = new HttpRequestBuilder('http://example.com')
    .addHeader('Content-Type', 'application/json')
    .addMethod(Method.POST)
    .addData({ id: 16 })
    .exec()
    .then(console.log)
    .catch(console.log);

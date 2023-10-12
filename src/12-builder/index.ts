enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

class HttpRequestBuilder {
    private method: Method = Method.GET;
    private body: any = null;
    private headers: Record<string, string> = {};

    constructor(private url: string) { }

    addMethod(method: Method): this {
        this.method = method;
        return this;
    }

    addBody(body: any): this {
        this.body = body;
        return this;
    }

    addHeader(header: string, value: string): this {
        this.headers[header] = value;
        return this;
    }

    exec(): Promise<Response> {
        return fetch(this.url, {
            method: this.method,
            body: this.body,
            headers: this.headers
        });
    }
}

const httpRequest = new HttpRequestBuilder('http://example.com')
    .addBody(new FormData())
    .addHeader('Content-Type', 'multipart/form-data')
    .addMethod(Method.POST);

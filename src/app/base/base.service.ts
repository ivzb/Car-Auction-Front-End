export abstract class BaseService {
    // private serviceUrl = 'http://daniauto.azurewebsites.net/odata/';
    private serviceUrl = 'http://localhost:13165/odata/';

    protected buildServiceUrl(params: string): string { 
        return this.serviceUrl + params;
    }

    protected handleError(error: any): Promise<any> {
        console.log(error);
        debugger;
        return Promise.reject(error.message || error);
    }
}
import { Injectable }    from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Make } from './make';
import { Car } from '../cars/car';

@Injectable()
export class MakeService {
  //private makesServiceUrl = 'http://localhost:13165/odata/Makes';
  private makesServiceUrl = 'http://daniauto.azurewebsites.net/odata/Makes';
  
  public constructor(private http: Http) { }

  public getMake(id: number): Promise<Make> {
    return this.http.get(this.makesServiceUrl + '(' + id + ')')
      .toPromise()
      .then(response => response.json() as Make)
      .catch(this.handleError);
  }

  public getMakes(): Promise<Make[]> {
    return this.http.get(this.makesServiceUrl + '?$orderby=Value')
      .toPromise()
      .then(response => response.json().value as Make[])
      .catch(this.handleError);
  }

  public getMakeCars(id: number): Promise<Car[]> {
    return this.http.get(this.makesServiceUrl + '(' + id + ')/Cars?$orderby=Id desc&$expand=Model, Make, Category')
      .toPromise()
      .then(response => response.json().value as Car[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
        console.log(error);
        debugger;
        return Promise.reject(error.message || error);
    }
}
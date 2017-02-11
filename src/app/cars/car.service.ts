import { Injectable }    from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Car } from './car';

declare var $: any;

@Injectable()
export class CarService {
  //private carsServiceUrl = 'http://localhost:13165/odata/Cars';
  private carsServiceUrl = 'http://daniauto.azurewebsites.net/odata/Cars';
  
  constructor(private http: Http) { }

  getCar(id: number): Promise<Car> {
    return this.http.get(this.carsServiceUrl + '(' + id + ')?$expand=Model, Make, Category, Bids, Images')
      .toPromise()
      .then(response => response.json() as Car)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
        console.log(error);
        debugger;
        return Promise.reject(error.message || error);
    }
}
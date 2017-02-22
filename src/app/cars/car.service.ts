import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// models
import { Car } from './car';

// services
import { BaseService } from '../base/base.service';

@Injectable()
export class CarService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    getCar(id: number): Promise<Car> {
        return this.http.get(super.buildServiceUrl('Cars(' + id + ')?$expand=Bids, Images, Category, Color, Currency, Fuel, Location, Make, Model, Transmission'))
            .toPromise()
            .then(response => response.json() as Car)
            .catch(super.handleError);
    }
}
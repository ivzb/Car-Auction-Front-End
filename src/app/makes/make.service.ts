import { Injectable }    from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// models
import { Make } from './make';
import { Car } from '../cars/car';

// services
import { BaseService } from '../base/base.service';

@Injectable()
export class MakeService extends BaseService {
  
    public constructor(private http: Http) {
        super();
    }

    public getMake(id: number): Promise<Make> {
        return this.http.get(this.buildServiceUrl('Makes(' + id + ')'))
          .toPromise()
          .then(response => response.json() as Make)
          .catch(super.handleError);
    }

    public getMakes(): Promise<Make[]> {
      return this.http.get(this.buildServiceUrl('Makes?$orderby=Value'))
        .toPromise()
        .then(response => response.json().value as Make[])
        .catch(super.handleError);
    }

    public getMakeCars(id: number): Promise<Car[]> {
      return this.http.get(this.buildServiceUrl('Makes(' + id + ')/Cars?$orderby=AuctionOn desc&$expand=Fuel'))
        .toPromise()
        .then(response => response.json().value as Car[])
        .catch(this.handleError);
    }
    
    public getMakeCarsFromPeriod(id: number, from: string): Promise<Car[]> {
      return this.http.get(this.buildServiceUrl('Makes(' + id + ')/Cars?$orderby=Id desc&$expand=Model, Make, Category&$filter=AuctionOn ge DateTime' + from))
        .toPromise()
        .then(response => response.json().value as Car[])
        .catch(this.handleError);
    }
    
    public getMakeCarsToPeriod(id: number, to: string): Promise<Car[]> {
      return this.http.get(this.buildServiceUrl('Makes(' + id + ')/Cars?$orderby=Id desc&$expand=Model, Make, Category&$filter=AuctionOn le DateTime' + to))
        .toPromise()
        .then(response => response.json().value as Car[])
        .catch(this.handleError);
    }

    
    public getMakeCarsAllPeriod(id: number, from: string, to: string): Promise<Car[]> {
      return this.http.get(this.buildServiceUrl('Makes(' + id + ')/Cars?$orderby=Id desc&$expand=Model, Make, Category&$filter=CreatedOn ge AuctionOn' + from + ' and AuctionOn le DateTime' + to))
        .toPromise()
        .then(response => response.json().value as Car[])
        .catch(this.handleError);
    }
}
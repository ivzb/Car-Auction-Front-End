import { Injectable } from '@angular/core'

// models
import { Car } from '../cars/car'

// services
import { BaseService } from '../base/base.service'

@Injectable()
export class CarService {
  private url: string = '/Cars'

  constructor(private baseService: BaseService) { }

  getCar(id: number) {
    return this.baseService.get(`${ this.url }(${ id })?$expand=Bids, Images, Category, Color, Currency, Fuel, Location, Make, Model, Transmission`)
  }
}
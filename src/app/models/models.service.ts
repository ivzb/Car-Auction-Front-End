import { Injectable } from '@angular/core'

// models
import { Car } from '../cars/car'

// services
import { BaseService } from '../base/base.service'

@Injectable()
export class ModelsService {
  private url: string = '/Models'

  constructor(private baseService: BaseService) { }

  getModel(id: number) {
    return this.baseService.get(`${ this.url }(${ id })?$expand=Make`)
  }

  getModelCars(id: number, top: number, skip: number) {
    return this.baseService.get(`${ this.url }(${ id })/Cars?$orderby=AuctionOn desc&$expand=Fuel&$top=${ top }&$skip=${ skip }`)
  }

  // getMakeCarsInPeriod(id: number, from: string, to: string) {
  //   let periodFilter: string = ''
  //   if (from != null && to != null) periodFilter = `&$filter=Auction ge DateTime${ from } and AuctionOn le DateTime${ to })`
  //   else if (from != null) periodFilter = `&$filter=AuctionOn ge DateTime${ from }`
  //   else if (to != null) periodFilter = `&$filter=AuctionOn le DateTime${ to }`

  //   return this.baseService.get(`${ this.url }(${ id })/Cars?$orderby=AuctionOn desc&$expand=Fuel${ periodFilter }`)
  // }
}
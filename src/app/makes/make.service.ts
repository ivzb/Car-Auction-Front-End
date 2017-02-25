import { Injectable } from '@angular/core'

// models
import { Make } from './make'
import { Car } from '../cars/car'

// services
import { BaseService } from '../base/base.service'

@Injectable()
export class MakeService {
  private url: string = '/Makes'

  constructor(private baseService: BaseService) { }

  getMake(id: number) {
    return this.baseService.get(`${ this.url }(${ id })`)
  }

  getMakes() {
    return this.baseService.get(`${ this.url }?$orderby=Value`)
  }

  getMakeCars(id: number) {
    return this.baseService.get(`${ this.url }(${ id })/Cars?$orderby=AuctionOn desc&$expand=Fuel`)
  }

  getMakeCarsInPeriod(id: number, from: string, to: string) {
    let periodFilter: string = ''
    if (from != null && to != null) periodFilter = `&$filter=Auction ge DateTime${ from } and AuctionOn le DateTime${ to })`
    else if (from != null) periodFilter = `&$filter=AuctionOn ge DateTime${ from }`
    else if (to != null) periodFilter = `&$filter=AuctionOn le DateTime${ to }`

    return this.baseService.get(`${ this.url }(${ id })/Cars?$orderby=AuctionOn desc&$expand=Fuel${ periodFilter }`)
  }
}
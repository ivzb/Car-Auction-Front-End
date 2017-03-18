import { Component, OnInit, HostBinding } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { groupBy, GroupResult } from '@progress/kendo-data-query'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/pairwise'

// models
import { Car } from './car'
import { Bid } from '../bids/bid'

// services
import { CarService } from './car.service'
import { LoadingBarService } from '../loading-bar.service'

@Component({
  templateUrl: 'car.template.html',
  styles: [`
    .k-scrollview-wrap {
      margin: 0 auto;
    }
  `]
})
export class CarComponent implements OnInit {
    private car: Car;
    private width = "600px";
    private height = "400px";

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: CarService,
      private loadingBarService: LoadingBarService
    ) { } 

    ngOnInit() {
      this.loadingBarService.startProgress()
      this.loadingBarService.incrementProgress(30)

      let id = +this.route.snapshot.params['id']
      this.getCar(id)
    }

    private getCar(id: number) {
      this.service
        .getCar(id)
        .subscribe(car => {
            this.car = car
            this.loadingBarService.completeProgress()
        })
    }
}
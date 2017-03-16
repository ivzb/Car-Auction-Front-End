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
  template: `
    <div *ngIf="car" class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <a [routerLink]="['/makes']">Makes</a>
                /
                <a [routerLink]="['/make/' + car.Make.Id]">{{ car.Make.Value }}</a>
                / 
                <a [routerLink]="['/model/' + car.Model.Id]">{{ car.Model.Value }}</a>
                /
                {{ car.Title }}
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-group">
                        <li class="list-group-item">
                            Auction date:
                            <b>{{ car.AuctionOn | amDateFormat:'LL' }}</b>
                            <b>({{ car.AuctionOn | amTimeAgo }})</b>
                        </li>
                        <li class="list-group-item">
                            Year: <b>{{ car.Year }}</b>
                        </li>
                        <li class="list-group-item">
                            Make: <b>{{ car.Make.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Model: <b>{{ car.Model.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Version: <b>{{ car.Version }}</b>
                        </li>
                        <li class="list-group-item">
                            Category: <b>{{ car.Category.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Location: <b>{{ car.Location.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Currency: <b>{{ car.Currency.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Transmission: <b>{{ car.Transmission.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Fuel: <b>{{ car.Fuel.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Colour: <b>{{ car.Color.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Estimated Value: <b>{{ car.EstimatedValue }}</b>
                        </li>
                        <li class="list-group-item">
                            Odometer: <b>{{ car.Odometer }}</b>
                        </li>
                        <li class="list-group-item">
                            Engine: <b>{{ car.Engine }}</b>
                        </li>
                        <li class="list-group-item">
                            Primary Damage: <b>{{ car.PrimaryDamage }}</b>
                        </li>
                        <li class="list-group-item">
                            Secondary Damage: <b>{{ car.SecondaryDamage }}</b>
                        </li>
                        <li class="list-group-item">
                            Body Style: <b>{{ car.BodyStyle }}</b>
                        </li>
                        <li class="list-group-item">
                            Drive: <b>{{ car.Drive }}</b>
                        </li>
                        <li class="list-group-item">
                            <kendo-chart>
                                <kendo-chart-title text="Bids">
                                </kendo-chart-title>
                                <kendo-chart-axis-defaults [line]="{ color: 'red' }">
                                    <kendo-chart-axis-defaults-labels font="12pt sans-serif">
                                    </kendo-chart-axis-defaults-labels>
                                </kendo-chart-axis-defaults>
                                <kendo-chart-tooltip>
                                    <template kendoChartSeriesTooltipTemplate let-value="value">
                                        Bid: £{{ value }}
                                    </template>
                                </kendo-chart-tooltip>
                                <kendo-chart-series>
                                    <kendo-chart-series-item
                                        field="Cost" type="line"
                                        [data]="car.Bids">
                                    </kendo-chart-series-item>
                                </kendo-chart-series>
                            </kendo-chart>
                        </li>
                        <li class="list-group-item">
                            <kendo-scrollview
                                [data]="car.Images"
                                [width]="width"
                                [height]="height"
                                [animate]="true"
                                [arrows]="true"
                                [pageable]="true"
                                [endless]="true">
                                <template let-item="item">
                                    <img src="{{ item.Url }}" draggable="false" [ngStyle]="{ minWidth: width }" />
                                </template>
                            </kendo-scrollview>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  `,
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
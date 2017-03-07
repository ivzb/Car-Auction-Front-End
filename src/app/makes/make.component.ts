import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

// models
import { Make } from './make';
import { Car } from '../cars/car';

// services
import { MakeService } from './make.service';

@Component({
  template: `
    <div *ngIf="make" class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ make.Value }}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-group" *ngIf="cars">
                        <li class="list-group-item car-item"
                            *ngFor="let car of cars"
                            [routerLink]="['/car/' + car.Id]">
                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                {{ car.AuctionOn | amDateFormat:'LL' }}
                                ({{ car.AuctionOn | amTimeAgo }})
                                |
                                <b>{{ car.Title }}</b>
                                (<i class="fa fa-cogs" aria-hidden="true"></i> {{ car.Engine }} cc, {{ car.Fuel.Value }})
                        </li>
                        <li>
                            <div (click)="loadMoreCars()">Load more...</div>
                        </li>
                    </ul>
                    
                    <h3 *ngIf="cars && cars.length == 0">No cars in category <b>{{ make.Value }}</b> found.</h3>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .car-item {
        cursor: pointer;
    }
  `]
})

export class MakeComponent implements OnInit {
    
    private make: Make
    private cars: Car[]
    private top: number
    private skip: number

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService
    ) { }

    ngOnInit() {
      let id: number = +this.route.snapshot.params['id']
      this.cars = []
      this.top = 21
      this.skip = 0
      this.getMake(id)
    }

    private getMake(id: number) {
        this.service
            .getMake(id)
            .subscribe(make => {
                this.make = make
                this.getMakeCars(id, this.top, this.skip)
            })
    }

    private getMakeCars(id: number, top: number, skip: number) {
        this.service
            .getMakeCars(id, top, skip)
            .subscribe(cars => this.cars.push(...cars))
    }

    private loadMoreCars() {
        this.skip += this.top
        console.log('skip: ' + this.skip);
        console.log('top: ' + this.top);
        this.getMakeCars(this.make.Id, this.top, this.skip)
    }

    // todo: pass moment object to service, not formatted string
    private formatMomentDateForOData(date: any): string {
        return `\\${date.momentObj.toISOString()}\\`
    }
}
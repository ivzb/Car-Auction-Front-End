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
                                <i class="fa fa-calendar-o" aria-hidden="true"></i> {{ parseDate(car.CreatedOn) }}
                                <b>{{ car.Title }}</b>
                                (<i class="fa fa-cogs" aria-hidden="true"></i> {{ car.Engine }} cc, {{ car.Fuel.Value }})
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

export class MakeDetailComponent implements OnInit {
    
    public make: Make
    public cars: Car[]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService
    ) { }

    public ngOnInit() {
      let id: number = +this.route.snapshot.params['id']
      this.getMake(id, null, null)
    }

    private getMake(id: number, from: string, to: string) {
        this.service
            .getMake(id)
            .subscribe(make => {
                this.make = make
                this.service
                .getMakeCars(id)
                .subscribe(cars => this.cars = cars) })
    }

    // todo: extract this to pipe
    public parseDate(date: string): string {
        return moment(date).format('D MMM YYYY')
    }

    private formatMomentDateForOData(date: any): string {
        return `\\${date.momentObj.toISOString()}\\`
    }
}
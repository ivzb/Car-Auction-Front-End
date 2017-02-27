import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';

import 'rxjs/add/operator/pairwise';

// models
import { Car } from './car';

// services
import { CarService } from './car.service';

@Component({
  template: `
    <div *ngIf="car" id="movie-detail" class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ car.Lot }}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-group">
                        <li class="list-group-item">
                            Auction date: <b>{{ parseDate(car.AuctionOn) }}</b>
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
                            Category: <b>{{ car.Category.Value }}</b>
                        </li>
                        <li class="list-group-item">
                            Damage: <b>{{ car.Damage }}</b>
                        </li>
                        <li class="list-group-item">
                            Engine Type: <b>{{ car.EngineType }}</b>
                        </li>
                        <li class="list-group-item">
                            Bids:
                        </li>
                        <li class="list-group-item" *ngFor="let bid of car.Bids; let i = index">
                            <b>£{{ bid.Cost }}</b>
                        </li>
                        <li class="list-group-item">
                            Images:
                        </li>
                        <li class="list-group-item" *ngFor="let image of car.Images; let i = index">
                            <img src="{{ image.Url }}" style="max-width: 100%" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [``]
})
export class CarComponent implements OnInit {
    
    car: Car;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: CarService
    ) { }

    ngOnInit() {
      let id = +this.route.snapshot.params['id'];
      this.getCar(id);
    }

    private getCar(id: number) {
        this.service
            .getCar(id)
            .subscribe(car => this.car = car)
    }

    // todo: extract this to pipe
    parseDate(date: string): string {
        return moment(date).format('D MMM YYYY');
    }
}
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

// models
import { Model } from './model';
import { Car } from '../cars/car';

// services
import { ModelsService } from './models.service';

@Component({
  template: `
    <div *ngIf="model" class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ model.Value }}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-group" *ngIf="cars">
                        <li class="list-group-item cursor-pointer"
                            *ngFor="let car of cars"
                            [routerLink]="['/car/' + car.Id]">
                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                {{ car.AuctionOn | amDateFormat:'LL' }}
                                ({{ car.AuctionOn | amTimeAgo }})
                                |
                                <b>{{ car.Title }}</b>
                                (<i class="fa fa-cogs" aria-hidden="true"></i> {{ car.Engine }} cc, {{ car.Fuel.Value }})
                        </li>

                         <li *ngIf="showLoadMoreButton" class="load-more-button cursor-pointer">
                            <div (click)="loadMoreCars()">Load more...</div>
                        </li>
                    </ul>
                    
                    <h3 *ngIf="cars && cars.length == 0">No car in category <b>{{ model.Value }}</b> found.</h3>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .load-more-button {
      list-style: none;
      display: block;
      margin: 20px auto;
      width: 150px;
    }

    .load-more-button div {
      background: rgb(41, 158, 255);
      padding: 10px 25px;
      text-align: center;
      font-weight: bold;
      color: #fff;
    }
  `]
})

export class ModelComponent implements OnInit {
    
    private model: Model
    private cars: Car[]
    private top: number
    private skip: number
    private showLoadMoreButton: boolean

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ModelsService
    ) { }

    ngOnInit() {
      let id: number = +this.route.snapshot.params['id']
      this.top = 21
      this.skip = 0
      this.showLoadMoreButton = false
      this.getModel(id)
    }

    private getModel(id: number) {
        this.service
            .getModel(id)
            .subscribe(model => {
                this.model = model
                this.getModelCars(id)
            })
    }

    private getModelCars(id: number) {
        this.service
            .getModelCars(id, this.top, this.skip)
            .subscribe(cars => {
              if (this.cars === undefined) this.cars = []
              this.cars.push(...cars)
              this.showLoadMoreButton = cars.length == this.top
            })
    }

    private loadMoreCars() {
        this.showLoadMoreButton = false
        this.skip += this.top
        this.getModelCars(this.model.Id)
    }
}
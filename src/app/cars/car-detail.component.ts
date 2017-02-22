import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { slideInDownAnimation } from '../animations';
import 'rxjs/add/operator/pairwise';

// models
import { Car } from './car';

// services
import { CarService } from './car.service';

@Component({
  templateUrl: './car-detail.template.html',
  animations: [ slideInDownAnimation ],
})
export class CarDetailComponent implements OnInit {
    
    car: Car;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: CarService
    ) {
    }

    public ngOnInit() {
      let id = +this.route.snapshot.params['id'];

      this.getCar(id);
    }

    public parseDate(date: string): string {
        return moment(date).format('D MMM YYYY');
    }

    private getCar(id: number) {
        this.service
            .getCar(id)
            .then(car => {
              this.car = car;
            })
            .catch(error => {
                //this.error = error
            });
    }
}
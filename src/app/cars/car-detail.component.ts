import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { slideInDownAnimation } from '../animations';

import { CarService } from './car.service';
import { Car } from './car';
import { Throphey } from './throphey';

import 'rxjs/add/operator/pairwise';

declare var loader: any;

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
        loader.start();
    }

    public ngOnInit() {
      let id = +this.route.snapshot.params['id'];

      this.getCar(id);
    }

    private getCar(id: number) {
        this.service
            .getCar(id)
            .then(car => {
              this.car = car;
              loader.done();
            })
            .catch(error => {
                //this.error = error
                loader.done();
            });
    }
}
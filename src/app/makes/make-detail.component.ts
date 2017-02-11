import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';

import { slideInDownAnimation } from '../animations';

import { MakeService } from './make.service';
import { Make } from './make';
import { Car } from '../cars/car';

import 'rxjs/add/operator/pairwise';

declare var loader: any;

@Component({
  templateUrl: './make-detail.template.html',
  animations: [ slideInDownAnimation ],
})

export class MakeDetailComponent implements OnInit {
    
    public make: Make;
    public cars: Car[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService
    ) {
        loader.start();
    }

    public ngOnInit() {
      let id = +this.route.snapshot.params['id'];

      this.getMake(id);
    }

    public onSelect(carId: number) {
        this.router.navigate(['/car', carId]);
    }

    public parseDate(date: string): string {
        return moment(date).format('D MMM YYYY');
    }

    private getMake(id: number) {
        this.service
            .getMake(id)
            .then(make => {
              this.make = make;
              loader.done();
              loader.start();

              this.service
                .getMakeCars(id)
                .then(cars => {
                    this.cars = cars;
                    loader.done();
                });
            })
            .catch(error => {
                //this.error = error
                loader.done();
            });
    }
}
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
  templateUrl: './make-detail.template.html'
})

export class MakeDetailComponent implements OnInit {
    
    public make: Make;
    public cars: Car[];
    private id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService
    ) {
    }

    public ngOnInit() {
      this.id = +this.route.snapshot.params['id'];

      this.getMake(null, null)
    }

    public onSelect(carId: number) {
        this.router.navigate(['/car', carId]);
    }

    public parseDate(date: string): string {
        return moment(date).format('D MMM YYYY');
    }

    private getMake(from: string, to: string) {
        let makeId = this.id;

        this.service
            .getMake(makeId)
            .subscribe(make => {
              this.make = make
              this.service
                .getMakeCars(makeId)
                .subscribe(cars => this.cars = cars) })
    }

    private formatMomentDateForOData(date: any): string {
        return '\'' + date.momentObj.toISOString() + '\'';
    }
}
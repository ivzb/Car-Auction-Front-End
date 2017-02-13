import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

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
    private id: number;

    from: DateModel;
    to: DateModel;
    options: DatePickerOptions;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService
    ) {
        loader.start();
        this.options = new DatePickerOptions();
        this.options.autoApply = true;
        this.options.maxDate = new Date();
    }

    public ngOnInit() {
      this.id = +this.route.snapshot.params['id'];

      this.getMake(null, null);
    }

    public onFromChanged(event: any)
    {
        let fromDate = event;
        let toDate = this.to;

        this.getMake(fromDate, toDate)
    }
    
    public onToChanged(event: any)
    {
        let fromDate = this.from;
        let toDate = event;

        this.getMake(fromDate, toDate)
    }

    public onSelect(carId: number) {
        this.router.navigate(['/car', carId]);
    }

    public parseDate(date: string): string {
        return moment(date).format('D MMM YYYY');
    }

    private getMake(from: any, to: any) {
        let makeId = this.id;

        this.service
            .getMake(makeId)
            .then(make => {
              this.make = make;
              loader.done();
              loader.start();

              if (from == null && to == null) {
                this.service
                .getMakeCars(makeId)
                .then(cars => {
                    this.cars = cars;
                    loader.done();
                });
              } else if (from != null && to != null) {
                this.service
                    .getMakeCarsAllPeriod(makeId, this.formatMomentDateForOData(from), this.formatMomentDateForOData(to))
                    .then(cars => {
                        this.cars = cars;
                        loader.done();
                    });
              } else if(from != null && to == null) {
                this.service
                    .getMakeCarsFromPeriod(makeId, this.formatMomentDateForOData(from))
                    .then(cars => {
                        this.cars = cars;
                        loader.done();
                    });
              } else if (from == null && to != null) {
                this.service
                    .getMakeCarsToPeriod(makeId, this.formatMomentDateForOData(to))
                    .then(cars => {
                        this.cars = cars;
                        loader.done();
                    });
              }
            })
            .catch(error => {
                //this.error = error
                loader.done();
            });
    }

    private formatMomentDateForOData(date: any): string {
        return '\'' + date.momentObj.toISOString() + '\'';
    }
}
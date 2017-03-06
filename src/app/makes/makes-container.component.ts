import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

// models
import { Make } from './make'

// componentss
import { MakeCardComponent } from './make-card.component';

// services
import { MakeService } from './make.service';

@Component({
  selector: 'makes-container',
  template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <h1 class="panel-title">Makes</h1>
                <kendo-autocomplete *ngIf="makesAutocompleteValues && makesAutocompleteValues.length > 0"
                    [data]="makesAutocompleteValues"
                    [valueField]="id"
                    [placeholder]="'Search...'">
                </kendo-autocomplete>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <make-card class="col-md-4"
                    *ngFor="let make of makes"
                    [make]="make" [routerLink]="['/make/' + make.Id]">
                </make-card>
            </div>
        </div>
    `
})

export class MakesContainerComponent implements OnInit {
    private makes: Make[]
    private makesAutocompleteValues: Array<{text: string, id: number}>

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private service: MakeService
    ) { }

    ngOnInit() {
      this.service
        .getMakes()
        .subscribe(makes => {
            this.makes = makes

            this.makesAutocompleteValues = []
            let _that = this
            this.makes.forEach(function callback(value: Make, index: number) {
                let autocompleteValue = { text: value.Value, id: value.Id }
                _that.makesAutocompleteValues.push(autocompleteValue)
            })
        })
    }
}
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
                
                <kendo-autocomplete
                    [data]="filteredMakesAutocompleteValues"
                    [valueField]="'text'"
                    [placeholder]="'Search...'"
                    [filterable]="true"
                    (filterChange)="handleSearchFilter($event)"
                    (valueChange)="handleSearchFilter($event)">
                </kendo-autocomplete>
                <i class="fa fa-search" aria-hidden="true"></i>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <make-card class="col-md-4"
                    *ngFor="let make of filteredMakes"
                    [make]="make" [routerLink]="['/make/' + make.Id]">
                </make-card>
            </div>
        </div>
    `
})

export class MakesContainerComponent implements OnInit {
    private makes: Make[]
    private filteredMakes: Make[]
    private makesAutocompleteValues: Array<{text: string, value: number}>
    private filteredMakesAutocompleteValues: Array<{text: string, value: number}>

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
            this.filteredMakes = makes

            this.makesAutocompleteValues = []
            let _that = this
            this.makes.forEach(function callback(value: Make, index: number) {
                let autocompleteValue = { text: value.Value, value: value.Id }
                _that.makesAutocompleteValues.push(autocompleteValue)
            })
            this.filteredMakesAutocompleteValues = this.makesAutocompleteValues;
        })
    }

    handleSearchFilter(search: string) {
        this.filteredMakesAutocompleteValues = this.makesAutocompleteValues.filter((x) => x.text.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        this.filteredMakes = this.makes.filter((x) => x.Value.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }
}
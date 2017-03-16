import { Component, OnInit, HostBinding } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import * as moment from 'moment'
import 'rxjs/add/operator/pairwise'
import 'rxjs/add/operator/switchMap'

// models
import { Make } from './make'
import { Model } from '../models/model'

// services
import { MakeService } from './make.service'
import { LoadingBarService } from '../loading-bar.service'

@Component({
  template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <h1 class="panel-title" *ngIf="make">
                    <a [routerLink]="['/makes']">Makes</a>
                    /
                    {{ make.Value }}
                </h1>
                
                <kendo-autocomplete
                    [data]="filteredModelsAutocompleteValues"
                    [valueField]="'text'"
                    [placeholder]="'Search...'"
                    [filterable]="true"
                    (filterChange)="handleSearchFilter($event)"
                    (valueChange)="handleSearchFilter($event)">
                </kendo-autocomplete>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row" id="tiles" *ngIf="models">
                <div class="col-md-4 col-sm-4 col-xs-12 tile"
                    *ngFor="let model of filteredModels"
                    [routerLink]="['/model/' + model.Id]">
                    <div class="team-portrait block cursor-pointer">              
                        <div class="title">
                            <h2>{{ model.Value }}</h2>
                        </div>
                    </div>
                </div>
                
                <h3 *ngIf="models && models.length == 0">No models in category <b>{{ make.Value }}</b> found.</h3>
            </div>
        </div>
  `,
})

export class MakeComponent implements OnInit {
    
    private make: Make
    private models: Model[]
    private filteredModels: Model[]
    private modelsAutocompleteValues: Array<{text: string, value: number}>
    private filteredModelsAutocompleteValues: Array<{text: string, value: number}>

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService,
        private loadingBarService: LoadingBarService
    ) { }

    ngOnInit() {
      this.loadingBarService.startProgress()
      this.loadingBarService.incrementProgress(30)

      let id: number = +this.route.snapshot.params['id']
      this.getMake(id)
    }

    private getMake(id: number) {
        this.service
            .getMake(id)
            .subscribe(make => {
                this.loadingBarService.incrementProgress(30)
                this.make = make
                this.getMakeModels(id)
            })
    }

    private getMakeModels(id: number) {
        this.service
            .getMakeModels(id)
            .subscribe(models => {
                this.loadingBarService.incrementProgress(30)
                this.models = models
                this.filteredModels = this.models

                this.modelsAutocompleteValues = []
                let _that = this
                this.models.forEach(function callback(value: Model, index: number) {
                    let autocompleteValue = { text: value.Value, value: value.Id }
                    _that.modelsAutocompleteValues.push(autocompleteValue)
                })
                this.filteredModelsAutocompleteValues = this.modelsAutocompleteValues;
                this.loadingBarService.completeProgress();
            })
    }
    
    handleSearchFilter(search: string) {
        this.filteredModelsAutocompleteValues = this.modelsAutocompleteValues.filter((x) => x.text.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        this.filteredModels = this.models.filter((x) => x.Value.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }
}
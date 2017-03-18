import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

// models
import { Make } from './make'
import { Model } from '../models/model'

// services
import { MakeService } from './make.service'
import { LoadingBarService } from '../loading-bar.service'

@Component({
  templateUrl: 'make.template.html',
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
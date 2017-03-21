import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// models
import { Make } from './make'

// componentss
import { MakeCardComponent } from './make-card.component';

// services
import { MakeService } from './make.service';
import { LoadingBarService } from '../loading-bar.service'

@Component({
  selector: 'makes-container',
  templateUrl: 'makes-container.template.html',
})

export class MakesContainerComponent implements OnInit {
    private makes: Make[]
    private filteredMakes: Make[]
    private makesAutocompleteValues: Array<{text: string, value: number}>
    private filteredMakesAutocompleteValues: Array<{text: string, value: number}>
    private showLoadMoreButton: boolean

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private service: MakeService,
      private loadingBarService: LoadingBarService
    ) { }

    ngOnInit() {
      this.loadingBarService.startProgress()
      this.loadingBarService.incrementProgress(30)

      this.service
        .getMakes(true)
        .subscribe(makes => {
            this.loadingBarService.incrementProgress(30)
            this.makes = makes
            this.filteredMakes = makes

            this.makesAutocompleteValues = []
            let _that = this
            this.makes.forEach(function callback(value: Make, index: number) {
                let autocompleteValue = { text: value.Value, value: value.Id }
                _that.makesAutocompleteValues.push(autocompleteValue)
            })
            this.filteredMakesAutocompleteValues = this.makesAutocompleteValues
            this.loadingBarService.completeProgress()
            this.showLoadMoreButton = true
        })
    }

    handleSearchFilter(search: string) {
        this.filteredMakesAutocompleteValues = this.makesAutocompleteValues.filter((x) => x.text.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        this.filteredMakes = this.makes.filter((x) => x.Value.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }

    private loadMakesWithoutImage() {
        this.loadingBarService.startProgress()
        this.loadingBarService.incrementProgress(30)

        this.showLoadMoreButton = false
        this.service
            .getMakes(false)
            .subscribe(makes => {
                this.loadingBarService.incrementProgress(30)
                this.makes.push(...makes)
                this.filteredMakes = this.makes 

                this.makesAutocompleteValues = []
                let _that = this
                this.makes.forEach(function callback(value: Make, index: number) {
                    let autocompleteValue = { text: value.Value, value: value.Id }
                    _that.makesAutocompleteValues.push(autocompleteValue)
                })
                this.filteredMakesAutocompleteValues = this.makesAutocompleteValues
                this.loadingBarService.completeProgress()
            })
    }
}
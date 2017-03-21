import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

// models
import { Model } from './model'
import { Car } from '../cars/car'

// services
import { ModelsService } from './models.service'
import { LoadingBarService } from '../loading-bar.service'

@Component({
  templateUrl: 'model.template.html',
})

export class ModelComponent implements OnInit {
    
    private model: Model
    private cars: Car[]
    private top: number
    private skip: number
    private showLoadMoreButton: boolean

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ModelsService,
        private loadingBarService: LoadingBarService
    ) { }

    ngOnInit() {
      this.loadingBarService.startProgress()
      this.loadingBarService.incrementProgress(30)

      let id: number = +this.route.snapshot.params['id']
      this.top = 21
      this.skip = 0
      this.showLoadMoreButton = false
      this.getModel(id)
    }

    private getModel(id: number) {
        this.service
            .getModel(id)
            .subscribe(model => {
                this.loadingBarService.incrementProgress(30)
                this.model = model
                this.getModelCars(id)
            })
    }

    private getModelCars(id: number) {
        this.service
            .getModelCars(id, this.top, this.skip)
            .subscribe(cars => {
              this.loadingBarService.incrementProgress(30)
              if (this.cars === undefined) this.cars = []
              this.cars.push(...cars)
              this.showLoadMoreButton = cars.length == this.top
              this.loadingBarService.completeProgress()
            })
    }

    private loadMoreCars() {
        this.loadingBarService.startProgress()
        this.loadingBarService.incrementProgress(30)

        this.showLoadMoreButton = false
        this.skip += this.top
        this.getModelCars(this.model.Id)
    }
}
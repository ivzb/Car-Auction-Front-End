import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

// models
import { Make } from './make';
import { Model } from '../models/model';

// services
import { MakeService } from './make.service';

@Component({
  template: `
    <div *ngIf="make" class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ make.Value }}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-group" *ngIf="models">
                        <li class="list-group-item cursor-pointer"
                            *ngFor="let model of models"
                            [routerLink]="['/model/' + model.Id]">
                                <b>{{ model.Value }}</b>
                        </li>
                    </ul>
                    
                    <h3 *ngIf="models && models.length == 0">No models in category <b>{{ make.Value }}</b> found.</h3>
                </div>
            </div>
        </div>
    </div>
  `,
})

export class MakeComponent implements OnInit {
    
    private make: Make
    private models: Model[]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: MakeService
    ) { }

    ngOnInit() {
      let id: number = +this.route.snapshot.params['id']
      this.getMake(id)
    }

    private getMake(id: number) {
        this.service
            .getMake(id)
            .subscribe(make => {
                this.make = make
                this.getMakeModels(id)
            })
    }

    private getMakeModels(id: number) {
        this.service
            .getMakeModels(id)
            .subscribe(models => this.models = models)
    }
}
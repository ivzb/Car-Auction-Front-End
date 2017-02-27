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
        </h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <make-card class="col-md-4"
                *ngFor="let make of makes"
                [make]="make" [routerLink]="['/make/' + make.Id]">
            </make-card>
        </div>
    </div>`,
  styles: [`
      .panel {
        margin: 20px 30px;
      }

      .panel-title {
          margin: 0;
          display: inline-block;
      }

      .panel-body {
          padding-bottom: 0;
      }
    `]
})

export class MakesContainerComponent implements OnInit {
    makes: Make[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: MakeService
    ) { }

    ngOnInit() {
        this.service
            .getMakes()
            .subscribe(makes => this.makes = makes)
    }
}
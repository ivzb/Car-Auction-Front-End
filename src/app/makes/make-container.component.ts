import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

// models
import { Make } from './make';

// services
import { MakeService } from './make.service';

@Component({
  selector: 'make-container',
  template: `
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">
            <h1 class="panel-title">Makes</h1>
        </h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div *ngFor="let make of makes" [routerLink]="['/make/' + make.Id]">
                <div class="col-md-4 box">
                    <div class="thumbnail">
                        <div class="caption">
                            <h3>{{ make.Value }}</h3>
                        </div>
                    </div>
                </div>
            </div>
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
    `]
})

export class MakeContainerComponent implements OnInit {
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
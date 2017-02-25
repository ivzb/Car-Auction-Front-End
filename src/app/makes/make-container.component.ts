import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MakeService } from './make.service';
import { Make } from './make';

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
            <div class="col-md-4">
                <div *ngFor="let make of makes; let i = index" [routerLink]="['make/' + make.Id]">
                    <div class="box" *ngIf="i % 3 == 0">
                        <div class="thumbnail">
                        <div class="caption">
                            <h3>{{ make.Value }}</h3>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div *ngFor="let make of makes; let i = index" (click)="onSelect(make)">
                <div class="box" *ngIf="i % 3 == 1">
                    <div class="thumbnail">
                    <div class="caption">
                        <h3>{{ make.Value }}</h3>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-md-4">
                <div *ngFor="let make of makes; let i = index" (click)="onSelect(make)">
                <div class="box" *ngIf="i % 3 == 2">
                    <div class="thumbnail">
                    <div class="caption">
                        <h3>{{ make.Value }}</h3>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>`,
  styles: [
      `.panel-title {
          margin: 0;
          display: inline-block;
      }`
  ]
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

    onSelect(make: Make) {
        this.router.navigate(['/make', make.Id])
    }
}
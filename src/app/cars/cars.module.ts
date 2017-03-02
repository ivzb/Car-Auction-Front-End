import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MomentModule } from 'angular2-moment';
import 'hammerjs';

// components
import { CarComponent } from './car.component';

// services
import { CarService } from './car.service';

// modules
import { CarsRouting } from './cars.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CarsRouting,
    HttpModule,
    JsonpModule,
    ScrollViewModule,
    ChartsModule,
    MomentModule
  ],
  declarations: [
    CarComponent,
  ],
  providers: [
    CarService
  ]
})
export class CarsModule { }
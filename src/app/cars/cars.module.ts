import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';

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
    JsonpModule
  ],
  declarations: [
    CarComponent,
  ],
  providers: [
    CarService
  ]
})
export class CarsModule { }
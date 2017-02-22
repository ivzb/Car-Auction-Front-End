import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';

// components
import { CarDetailComponent } from './car-detail.component';

// services
import { CarService } from './car.service';

// modules
import { CarsRoutingModule } from './cars-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CarsRoutingModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    CarDetailComponent,
  ],
  providers: [
    CarService
  ]
})
export class CarsModule {}
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarDetailComponent } from './car-detail.component';

const carsRoutes: Routes = [
  { path: 'car/:id', component: CarDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(carsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarsRoutingModule { }
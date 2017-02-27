import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

// components
import { CarComponent }  from './car.component';

export const CarsRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'car/:id', component: CarComponent }
])
import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

// components
import { ModelComponent } from './model.component';

export const ModelsRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'model/:id', component: ModelComponent }
])
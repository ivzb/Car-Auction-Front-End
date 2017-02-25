import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

// components
import { MakeContainerComponent }  from './make-container.component';
import { MakeDetailComponent } from './make-detail.component';

export const MakesRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'makes', component: MakeContainerComponent },
  { path: 'make/:id', component: MakeDetailComponent }
])
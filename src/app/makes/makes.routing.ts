import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

// components
import { MakesContainerComponent }  from './makes-container.component';
import { MakeComponent } from './make.component';

export const MakesRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'makes', component: MakesContainerComponent },
  { path: 'make/:id', component: MakeComponent }
])
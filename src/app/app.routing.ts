import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

// components
import { PageNotFoundComponent } from './page-not-found.component';

export const AppRouting: ModuleWithProviders = RouterModule.forRoot([
    { path: '', redirectTo: 'makes', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
], { useHash: true })
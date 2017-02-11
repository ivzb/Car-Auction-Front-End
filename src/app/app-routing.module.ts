import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { MakesListComponent }   from './makes/makes-list.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: 'makes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
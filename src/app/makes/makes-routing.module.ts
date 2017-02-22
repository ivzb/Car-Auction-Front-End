import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { MakesListComponent }  from './makes-list.component';
import { MakeDetailComponent } from './make-detail.component';

const makesRoutes: Routes = [
  { path: 'makes', component: MakesListComponent },
  { path: 'make/:id', component: MakeDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(makesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MakesRoutingModule { }
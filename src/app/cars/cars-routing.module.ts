import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AchievementsListComponent }  from './achievements-list.component';
import { CarDetailComponent } from './car-detail.component';
//import { CreateAchievementComponent } from './create-achievement.component';

const carsRoutes: Routes = [
  //{ path: 'achievements/:page', component: AchievementsListComponent },
  //{ path: 'achievements/:search/:page', component: AchievementsListComponent },
  //{ path: 'achievement/create', component: CreateAchievementComponent },
  { path: 'car/:id', component: CarDetailComponent },
  //{ path: 'achievements', component: AchievementsListComponent }
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
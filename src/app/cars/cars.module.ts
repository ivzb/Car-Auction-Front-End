import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';

//import { AchievementsListComponent }  from './achievements-list.component';
import { CarDetailComponent } from './car-detail.component';
//import { CreateAchievementComponent } from './create-achievement.component';

import { CarService } from './car.service';
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
    //AchievementsListComponent,
    CarDetailComponent,
    //CreateAchievementComponent
  ],
  providers: [
    CarService
  ]
})
export class CarsModule {}
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { CalendarModule } from 'angular-calendar';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CarsModule } from './cars/cars.module';
import { MakesModule }       from './makes/makes.module';

import { PageNotFoundComponent } from './page-not-found.component';

import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CarsModule,
    MakesModule,
    AppRoutingModule,
    SimpleNotificationsModule,
    PushNotificationsModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
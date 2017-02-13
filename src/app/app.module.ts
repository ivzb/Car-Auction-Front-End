import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { DatePickerModule } from 'ng2-datepicker';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CarsModule } from './cars/cars.module';
import { MakesModule }       from './makes/makes.module';

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CarsModule,
    MakesModule,
    AppRoutingModule,
    DatePickerModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'

// components
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { PageNotFoundComponent } from './page-not-found.component'

// services
import { BaseService } from './base/base.service';

// modules
import { AppRouting } from './app.routing'
import { CarsModule }  from './cars/cars.module'
import { MakesModule } from './makes/makes.module'

@NgModule({
  imports: [
    BrowserModule,
    CarsModule,
    MakesModule,
    AppRouting
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  providers: [
    BaseService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
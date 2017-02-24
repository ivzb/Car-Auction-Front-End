import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'

// components
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { PageNotFoundComponent } from './page-not-found.component'

// modules
import { AppRoutingModule } from './app-routing.module'
import { CarsModule }  from './cars/cars.module'
import { MakesModule } from './makes/makes.module'

@NgModule({
  imports: [
    BrowserModule,
    CarsModule,
    MakesModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
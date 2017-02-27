import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'

// components
import { MakesContainerComponent } from './makes-container.component'
import { MakeCardComponent } from './make-card.component'
import { MakeComponent } from './make.component'

// services
import { MakeService } from './make.service'

// modules
import { MakesRouting } from './makes.routing'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MakesRouting,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    MakesContainerComponent,
    MakeCardComponent,
    MakeComponent
  ],
  providers: [
    MakeService
  ]
})
export class MakesModule { }
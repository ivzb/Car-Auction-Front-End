import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule, JsonpModule } from '@angular/http'
import { MomentModule } from 'angular2-moment';

// components
import { ModelComponent } from './model.component'

// services
import { ModelsService } from './models.service'

// modules
import { ModelsRouting } from './models.routing'

@NgModule({
  imports: [
    CommonModule,
    ModelsRouting,
    HttpModule,
    MomentModule,
    JsonpModule,
  ],
  declarations: [
    ModelComponent
  ],
  providers: [
    ModelsService
  ]
})
export class ModelsModule { }
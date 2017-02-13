import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

import { MakesListComponent }  from './makes-list.component';
import { MakeDetailComponent } from './make-detail.component';

import { MakeService } from './make.service';
import { MakesRoutingModule } from './makes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MakesRoutingModule,
    HttpModule,
    JsonpModule,
    DatePickerModule
  ],
  declarations: [
    MakesListComponent,
    MakeDetailComponent
  ],
  providers: [
    MakeService
  ]
})
export class MakesModule {}
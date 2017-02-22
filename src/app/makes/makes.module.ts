import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

// components
import { MakesListComponent }  from './makes-list.component';
import { MakeDetailComponent } from './make-detail.component';

// services
import { MakeService } from './make.service';

// modules
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
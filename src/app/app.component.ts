import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    date: DateModel;
  options: DatePickerOptions;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.options = new DatePickerOptions();
    }

    public notificationOptions = {
        position: ["bottom", "right"],
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        lastOnBottom: true,
        clickToClose: true,
    }
}
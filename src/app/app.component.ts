import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private route: ActivatedRoute, private router: Router) { }

    public notificationOptions = {
        position: ["bottom", "right"],
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        lastOnBottom: true,
        clickToClose: true,
    }
}
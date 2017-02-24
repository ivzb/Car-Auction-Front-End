import { Component } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `
    <navbar></navbar>
    <router-outlet></router-outlet>`
})
export class AppComponent {
    
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }
}
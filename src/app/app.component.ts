import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { SlimLoadingBarService } from 'ng2-slim-loading-bar'

// services
import { LoadingBarService } from './loading-bar.service'

@Component({
  selector: 'app-root',
  template: `
    <ng2-slim-loading-bar></ng2-slim-loading-bar>
    <navbar></navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private slimLoadingBarService: SlimLoadingBarService,
        private loadingBarService: LoadingBarService
    ) {
        this.loadingBarService.progressStart.subscribe(item => this.slimLoadingBarService.start());
        this.loadingBarService.progressIncrement.subscribe(item => this.slimLoadingBarService.progress += item);
        this.loadingBarService.progressComplete.subscribe(item => this.slimLoadingBarService.complete());
        this.loadingBarService.progressStop.subscribe(item => this.slimLoadingBarService.stop());
        this.loadingBarService.progressReset.subscribe(item => this.slimLoadingBarService.reset());
    }
}
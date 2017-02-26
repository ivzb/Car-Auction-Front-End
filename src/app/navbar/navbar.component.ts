import { Component } from '@angular/core'

@Component({
  selector: 'navbar',
  template: `
    <nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
        <button type="button" class="navbar-toggle navbar-collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Menu</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" routerLink="/makes" style="padding: 5px;">
            <img id="daniauto-logo" alt="Brand" src="logo.png" width="40px">
        </a>
        <a class="navbar-brand" routerLink="/makes">Dani Sarul Auto Copart Informational Application</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li><a routerLink="/makes" routerLinkActive="active">Makes</a></li>
        </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>`,
  styles: [
    ``
  ]
})
export class NavbarComponent {}
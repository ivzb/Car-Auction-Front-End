import { Component } from '@angular/core'

@Component({
  selector: 'navbar',
  template: `
    <div id="navbar" class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" routerLink="/makes">
          <img alt="Brand" src="/assets/logo.png">
          DaniAuto
        </a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li><a class="scroll" routerLink="/makes" routerLinkActive="active"><i class="icon-briefcase"></i>Makes<span class="arrow-left"></span></a></li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
    `
})
export class NavbarComponent {}
import { Component } from '@angular/core'

@Component({
  selector: 'navbar',
  template: `
    <div id="navbar" class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" (click)="isCollapsed = !isCollapsed">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" routerLink="/makes">
          <img alt="Brand" src="/assets/logo.png">
          DaniAuto
        </a>
      </div>
      <div [collapse]="isCollapsed">
        <ul class="nav navbar-nav">
          <li>
            <a class="scroll" routerLink="/makes" routerLinkActive="active" (click)="isCollapsed = true">
              <i class="icon-briefcase"></i>Makes<span class="arrow-left"></span>
            </a>
          </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
    `,
    styles: [`
      .collapse, .collapse.in {
        display: block !important;
        transition: all .25s ease-in-out;
      }

      .collapse {
        opacity: 0;
        height: 0;
      }

      .collapse.in {
        opacity: 1;
        height: 100%;
      }
    `]
})
export class NavbarComponent {
  isCollapsed: boolean = true 
}
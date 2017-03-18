import { Component } from '@angular/core'

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.template.html',
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
  /* hacky closing navbar menu for small screens,
     because otherwise its collapsed on page load */
  isCollapsed: boolean = window.innerWidth < 990
}
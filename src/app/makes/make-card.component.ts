import { Component, Input } from '@angular/core'

@Component({
  selector: 'make-card',
  templateUrl: 'make-card.template.html',
})
export class MakeCardComponent {
  @Input() make
}
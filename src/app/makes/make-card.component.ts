import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core'

@Component({
  selector: 'make-card',
  template: `
    <div class="thumbnail">
        <div class="caption">
            <h3>{{ make.Value }}</h3>
        </div>
    </div>
  `,
  styles: [`
    .caption {
      cursor: pointer;
    }
  `]
})
export class MakeCardComponent {
  @Input() make
}
import { Input, Component } from '@angular/core';

/**
 * Say hello to user
 */
@Component({
  selector: 'authdare-greeting',
  template: ` <p>Hello, {{ username }}</p> `,
  styles: [],
})
export class GreetingComponent {
  @Input() username = 'Not Provided';
}

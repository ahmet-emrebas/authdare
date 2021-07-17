import { Component } from '@angular/core';
import { NavbarItem } from '@authdare/navbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navbarItems: NavbarItem[] = [
    {
      icon: 'source',
      path: 'material-doc',
      type: 'INTERNAL',
    },
  ];
  title = 'client';
}

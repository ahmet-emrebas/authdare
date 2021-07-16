import { Component } from '@angular/core';
import { SidenavItem } from '@authdare/sidenav';
@Component({
  styleUrls: ['./material-doc.component.scss'],
  templateUrl: './material-doc.component.html',
})
export class MaterialDocComponent {
  sidenavItems: SidenavItem[] = [
    {
      path: '/material-doc/SidenavComponent',
      label: 'Home',
      icon: 'home',
    },
    {
      path: '/material-doc/NavbarComponent',
      label: 'Navbar',
      icon: 'menu',
    },
  ];
}

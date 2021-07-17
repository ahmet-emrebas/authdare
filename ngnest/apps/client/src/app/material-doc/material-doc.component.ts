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

    {
      path: '/material-doc/TableComponent',
      label: 'Table',
      icon: 'table',
    },
    {
      path: '/material-doc/CarouselComponent',
      label: 'Carousel',
      icon: 'live_tv',
    },

    {
      path: '/material-doc/FormComponent',
      label: 'Form',
      icon: 'input',
    },
  ];
}

import { Component } from '@angular/core';
import { SidenavItem } from '@authdare/sidenav';
import { slideInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  styleUrls: ['./material-doc.component.scss'],
  templateUrl: './material-doc.component.html',
  animations: [slideInLeftOnEnterAnimation()],
})
export class MaterialDocComponent {
  sidenavItems: SidenavItem[] = [
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
    {
      path: '/material-doc/ChartComponent',
      label: 'Chart',
      icon: 'table_chart',
    },
    {
      path: '/material-doc/TypingComponent',
      label: 'Typing',
      icon: 'keyboard',
    },
    {
      path: '/material-doc/QrcodeComponent',
      label: 'Qrcode',
      icon: 'qr_code_2',
    },
    {
      path: '/material-doc/InvoiceComponent',
      label: 'Invoice',
      icon: 'receipt',
    },
  ];
}

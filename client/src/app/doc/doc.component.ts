import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavbarService } from 'projects/navbar/src/public-api';
import { setSidenavTitle, setSidenavItems } from 'projects/sidenav/src/lib';
import { TableService } from 'projects/table/src/public-api';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  constructor(
    private store: Store,
    private navbarService: NavbarService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.tableService.addManyToCache([
      { id: 1, groupId: 1, firstName: 'AHmet', lastName: 'Ermebas' },
      { id: 2, groupId: 1, firstName: 'Mehmet', lastName: 'Ermebas' },
      { id: 3, groupId: 1, firstName: 'Kemal', lastName: 'Ermebas' },
      { id: 4, groupId: 1, firstName: 'Cevat', lastName: 'Ermebas' },
    ]);

    this.navbarService.addManyToCache([
      {
        id: 1,
        groupId: 1,
        order: 1,
        icon: 'home',
        path: '/',
        tooltip: 'Home page',
        type: 'INTERNAL',
      },
      {
        id: 2,
        groupId: 1,
        order: 2,
        icon: 'info',
        path: 'about',
        tooltip: 'About page',
        type: 'INTERNAL',
      },
      {
        id: 3,
        groupId: 1,
        order: 3,
        icon: 'email',
        path: 'mailto: info@authdare.com',
        tooltip: 'Contact page',
        type: 'EXTERNAL',
      },
      {
        id: 4,
        groupId: 1,
        order: 4,
        icon: 'phone',
        path: 'tel:8328742422',
        tooltip: 'Call',
        type: 'EXTERNAL',
      },
    ]);

    this.store.dispatch(
      setSidenavTitle({ sidenavTitle: 'Authdare Material Doc' })
    );

    this.store.dispatch(
      setSidenavItems({
        sidenavItems: [
          { path: 'form', label: 'Form', icon: 'input' },
          { path: 'chart', label: 'Chart', icon: 'bar_chart' },
          { path: 'navbar', label: 'Navbar', icon: 'menu' },
          { path: 'basic-card', label: 'Basic Card', icon: 'payments' },
          { path: 'product-card', label: 'Product Card', icon: 'payments' },
          {
            path: 'carousel-navigation',
            label: 'Carousel Navigation',
            icon: 'live_tv',
          },
          { path: 'carousel', label: 'Carousel', icon: 'live_tv' },
          { path: 'table', label: 'Table', icon: 'table_chart' },
        ],
      })
    );
  }
}

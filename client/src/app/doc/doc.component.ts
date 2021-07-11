import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavbarService } from 'projects/navbar/src/public-api';
import { setSidenavTitle, setSidenavItems } from 'projects/sidenav/src/lib';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  constructor(private store: Store, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.addManyToCache([
      {
        id: 1,
        icon: 'input',
        path: '/doc/form',
        tooltip: 'Form Component',
      },
      {
        id: 2,
        icon: 'info',
        path: 'about',
        tooltip: 'About',
      },
      {
        id: 3,
        icon: 'email',
        path: 'contact',
        tooltip: 'Contact',
      },
      {
        id: 4,
        icon: 'phone',
        path: 'tel:8328742422',
        tooltip: 'Call',
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
        ],
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'projects/navbar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private navbarService: NavbarService, private router: Router) {}
  ngOnInit(): void {
    this.updateNavbar();
  }

  updateNavbar() {
    this.navbarService.addManyToCache([
      {
        id: 1,
        groupId: 1,
        order: 2,
        icon: 'info',
        path: '/about',
        tooltip: 'About',
        type: 'INTERNAL',
      },
      {
        id: 2,
        groupId: 1,
        order: 1,
        icon: 'home',
        path: '/',
        tooltip: 'Home',
        type: 'INTERNAL',
      },
    ]);
  }
}

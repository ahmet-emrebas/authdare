import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
    this.router.events.subscribe((e) => {
      this.updateNavbar();
    });
  }

  updateNavbar() {
    this.navbarService.addManyToCache([
      {
        id: 1,
        groupId: 2,
        order: 2,
        icon: 'description',
        path: '/doc',
        tooltip: 'Documentation',
        type: 'INTERNAL',
      },
      {
        id: 2,
        groupId: 2,
        order: 1,
        icon: 'home',
        path: '/',
        tooltip: 'Home',
        type: 'INTERNAL',
      },
    ]);
  }
}

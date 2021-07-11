import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { uniqBy } from 'lodash';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NavbarItem, NavbarService } from './navbar.service';

@Component({
  selector: 'authdare-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeOutOnLeaveAnimation()],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  navbarItems$ = this.service.entities$;
  isMenuOpen = false;

  constructor(private service: NavbarService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  toogleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

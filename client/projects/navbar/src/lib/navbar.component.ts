import { Component } from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'authdare-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeOutOnLeaveAnimation()],
})
export class NavbarComponent {
  navbarItems$ = this.service.entities$;
  isMenuOpen = false;
  constructor(private service: NavbarService) {}
}

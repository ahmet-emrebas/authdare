import { Component, Input } from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { NavbarItem } from './navbar-item/navbar-item.component';

@Component({
  selector: 'authdare-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeOutOnLeaveAnimation()],
})
export class NavbarComponent {
  @Input() navbarItems!: NavbarItem[];
  isMenuOpen = false;
  constructor() {}
}

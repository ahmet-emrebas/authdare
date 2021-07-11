import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';
import { NavbarItem } from '../navbar.service';

@Component({
  selector: 'authdare-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    bounceOutOnLeaveAnimation(),
  ],
})
export class NavbarItemComponent implements OnInit {
  @Input() navbarItem!: NavbarItem;
  @Input() isVisible: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';

export interface NavbarItem {
  type: 'INTERNAL' | 'EXTERNAL';
  path: string;
  icon: string;
}

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
  @Input() isVisible = true;
  @Input() index = 1000;
  constructor() {}

  ngOnInit(): void {
    this.index++;
  }
}

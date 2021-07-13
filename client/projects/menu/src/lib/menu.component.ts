import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

export interface MenuItem {
  icon: string;
  path: string;
  color: 'primary' | 'warn' | 'accent';
}

@Component({
  selector: 'authdare-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class MenuComponent implements OnInit {
  @Input() id: number = -1;
  @Input() position: 'down' | 'left' | 'right' | 'up' = 'left';
  @Output() onClick = new EventEmitter<string>();
  @Input() menuItems: MenuItem[] = [
    {
      icon: 'open_in_new',
      path: 'view',
      color: 'primary',
    },
    {
      icon: 'delete',
      path: 'delete',
      color: 'warn',
    },
    {
      icon: 'edit',
      path: 'edit',
      color: 'accent',
    },
  ];
  ngOnInit(): void {}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

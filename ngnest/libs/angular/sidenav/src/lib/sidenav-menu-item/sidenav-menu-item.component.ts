import { Input, Component, OnInit } from '@angular/core';

export class SidenavMenuItem {
  label: string | undefined;
  icon: string | undefined;
  iconClass: string | undefined;
  constructor(value: Partial<SidenavMenuItem>) {
    Object.assign(this, value);
  }
}

@Component({
  selector: 'authdare-sidenav-menu-item',
  templateUrl: './sidenav-menu-item.component.html',
  styleUrls: ['./sidenav-menu-item.component.css'],
})
export class SidenavMenuItemComponent implements OnInit {
  @Input() sidenavMenuItem!: SidenavMenuItem;

  ngOnInit(): void {
    if (!this.sidenavMenuItem) {
      throw new Error('sidenavMenuItem must be provided!');
    }
    this.sidenavMenuItem = new SidenavMenuItem(this.sidenavMenuItem);
  }
}

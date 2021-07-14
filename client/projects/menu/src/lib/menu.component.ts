import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface MenuItem {
  icon: string;
  path: string;
  color: 'primary' | 'warn' | 'accent';
}

@Component({
  selector: 'authdare-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    bounceOutOnLeaveAnimation({ anchor: 'bOut' }),
    bounceInOnEnterAnimation({ anchor: 'bIn' }),
  ],
})
export class MenuComponent implements OnInit {
  @Input() scopeElementRef!: HTMLElement;
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

  constructor() {}
  isMenuOpen$$ = new BehaviorSubject<boolean>(false);
  isMenuOpen$ = this.isMenuOpen$$.pipe(debounceTime(300));

  ngOnInit(): void {}

  toggleMenu() {
    setTimeout(() => {
      this.scopeElementRef.removeAllListeners!();
      this.isMenuOpen$$.next(!this.isMenuOpen$$.getValue());
      this.scopeElementRef.addEventListener('click', (event) => {
        this.isMenuOpen$$.next(false);
      });
    });
  }

  onMenuItemClick(path: string) {
    setTimeout(() => {
      this.onClick.emit(path);
    });
    this.isMenuOpen$$.next(false);
  }
}

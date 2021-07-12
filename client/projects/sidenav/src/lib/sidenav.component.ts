import { Component, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SidenavStoreState } from './sidenav.actions';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';

export type SidenavListItem = {
  icon: string;
  path: string;
  label: string;
};

@Component({
  selector: 'authdare-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() debug = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  sidenav$ = this.store.pipe(map((d) => d.sidenav));

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<{ sidenav: SidenavStoreState }>
  ) {}

  async toggleIfHandset() {
    if (await this.isHandset$.toPromise()) this.drawer.toggle();
    return;
  }
}

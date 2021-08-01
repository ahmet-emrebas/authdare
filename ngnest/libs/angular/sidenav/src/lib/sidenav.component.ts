import { Component, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';

export type SidenavItem = {
  icon: string;
  href?: string;
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
  @Input() sidenavItems!: SidenavItem[];
  @Input() sidenavTitle = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  async toggleIfHandset() {
    if (await this.isHandset$.toPromise()) this.drawer.toggle();
    return;
  }
}

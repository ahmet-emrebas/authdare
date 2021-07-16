import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { map } from 'rxjs/operators';

export enum SidenavPositions {
  /**
   * Left sidenav container, Ex: <tag LEFT_SIDENAV></tag>
   */
  LEFT_SIDENAV = 'LEFT_SIDENAV',
  /**
   * Right sidenav container, Ex: <tag RIGHT_SIDENAV></tag>
   */
  RIGHT_SIDENAV = 'RIGHT_SIDENAV',
  /**
   * Content container, Ex: <tag CONTENT></tag>
   */
  CONTENT = 'CONTENT',
}

@Component({
  selector: 'authdare-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [],
})
export class SidenavComponent implements OnInit {
  isHandset$ = this.breakPointObserver
    .observe([Breakpoints.Handset])
    .pipe(map((e) => e.matches));

  @ViewChild('leftSidenav') leftSidenav!: MatSidenav;
  @ViewChild('rightSidenav') rightSidenav!: MatSidenav;

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.isHandset$.subscribe(console.log);
  }
}

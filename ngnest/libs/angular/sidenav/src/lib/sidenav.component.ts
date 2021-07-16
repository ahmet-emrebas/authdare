import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'authdare-sidenav',
  template: `
    <h3>Navigation</h3>
    <hr />
    <ng-content></ng-content>
  `,
  styles: [],
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

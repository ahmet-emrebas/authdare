import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SidenavModule,
  SidenavListItem,
  setSidenavTitle,
  setSidenavItems,
} from 'projects/sidenav/src/lib';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      setSidenavTitle({ sidenavTitle: 'Authdare Material Doc' })
    );
    this.store.dispatch(
      setSidenavItems({
        sidenavItems: [{ path: 'form', label: 'Form', icon: 'input' }],
      })
    );
  }
}

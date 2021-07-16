import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '@authdare/sidenav';
import { MaterialDocComponent } from './material-doc.component';
import { SidenavDocComponent } from './sidenav-doc/sidenav-doc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarModule } from '@authdare/navbar';
import { TableModule } from '@authdare/table';
import { NavbarDocComponent } from './navbar-doc/navbar-doc.component';
import { TableDocComponent } from './table-doc/table-doc.component';

@NgModule({
  declarations: [
    MaterialDocComponent,
    NavbarDocComponent,
    SidenavDocComponent,
    TableDocComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SidenavModule,
    NavbarModule,
    TableModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialDocComponent,
        children: [
          {
            path: 'SidenavComponent',
            component: SidenavDocComponent,
          },

          {
            path: 'NavbarComponent',
            component: NavbarDocComponent,
          },
          {
            path: 'TableComponent',
            component: TableDocComponent,
          },
        ],
      },
    ]),
  ],
})
export class MaterialDocModule {}

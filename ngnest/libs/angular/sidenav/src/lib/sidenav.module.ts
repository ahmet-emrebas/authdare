import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { SidenavMenuItemComponent } from './sidenav-menu-item/sidenav-menu-item.component';

@NgModule({
  declarations: [SidenavComponent, SidenavMenuItemComponent],
  imports: [CommonModule, MatSidenavModule, LayoutModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  exports: [MenuComponent],
})
export class MenuModule {}

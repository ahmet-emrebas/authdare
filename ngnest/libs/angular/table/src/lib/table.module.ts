import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { ColumnNamePipe } from './column-name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [TableComponent, ColumnNamePipe, MenuComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
  ],

  exports: [TableComponent, ColumnNamePipe, MenuComponent],
})
export class TableModule {}

import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './table.component';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { entityConfig } from './entity-metadata';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { ColumnNamePipe } from './column-name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuModule } from 'projects/menu/src/public-api';

@NgModule({
  declarations: [TableComponent, ColumnNamePipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MenuModule,
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forFeature([]),
  ],
  providers: [TableService],
  exports: [TableComponent],
})
export class TableModule {}

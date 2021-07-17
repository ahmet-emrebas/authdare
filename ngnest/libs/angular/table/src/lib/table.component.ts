import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { keys } from 'lodash';
import { Subscription } from 'rxjs';
import { MenuItem } from './menu';

export interface TableItem {
  [key: string]: any;
}

@Component({
  selector: 'authdare-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;

  @Input() tableData: { [key: string]: any }[] = [];
  @Input() isActionButtonVisible = true;
  @Input() isIdsVisible = true;
  @Input() highlightBy: string[] = [''];

  @Output() onRowClick = new EventEmitter<number>();
  @Output() onMenuClick = new EventEmitter<{ path: string; id: number }>();
  menuItems: MenuItem[] = [
    {
      icon: 'open_in_new',
      path: 'view',
      color: 'primary',
    },
    {
      icon: 'delete',
      path: 'delete',
      color: 'warn',
    },
    {
      icon: 'edit',
      path: 'edit',
      color: 'accent',
    },
  ];

  /**
   * Whenever a row clicks, then emits the id of the associated item.
   */

  columns!: string[];
  displayedColumns!: string[];

  dataSource!: MatTableDataSource<TableItem>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  ngOnInit(): void {
    this.columns = keys(this.tableData[0]).filter(
      (e) => e !== 'path' && e !== 'groupId'
    );

    if (this.isActionButtonVisible) this.columns.push('actions');

    this.displayedColumns = this.columns.filter((e) => {
      if (!this.isIdsVisible) {
        return e !== 'id';
      } else {
        return true;
      }
    });

    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {}

  onMenuClickHandle(path: string, id: number) {
    this.onMenuClick.emit({ path, id });
  }
}

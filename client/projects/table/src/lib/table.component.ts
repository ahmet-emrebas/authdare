import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { keys } from 'lodash';
import { MenuItem } from 'projects/menu/src/public-api';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableItem, TableService } from './table.service';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;

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
   * When multiple table component is used, this group id will distinguish them.
   */
  @Input() groupId = 1;

  /**
   * Whenever a row clicks, then emits the id of the associated item.
   */
  @Output() onRowClick = new EventEmitter<number>();

  columns: string[] = [];
  displayedColumns: string[] = [];

  dataSource!: MatTableDataSource<TableItem>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private tableService: TableService) {}

  subscription!: Subscription;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscription = this.tableService.entities$
      .pipe(map((items) => items.filter((e) => e.groupId == this.groupId)))
      .subscribe((data) => {
        this.columns = keys(data[0]).filter(
          (e) => e !== 'path' && e !== 'groupId'
        );

        this.columns.push('actions');

        this.displayedColumns = this.columns;

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onMenuClick(path: string, id: number) {
    console.log(path, id);
  }
}

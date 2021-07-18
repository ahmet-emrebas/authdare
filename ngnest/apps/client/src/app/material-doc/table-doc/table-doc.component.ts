import {
  Component,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { name, internet } from 'faker';
import { TableComponent } from '@authdare/table';

import { BehaviorSubject } from 'rxjs';
let i = 0;
function genFakeData(size: number): any[] {
  const list = new Array(size).fill(0).map((e) => {
    const firstName = name.firstName();
    const lastName = name.lastName();
    const email = internet.email(firstName, lastName);
    const age = ~~(Math.random() * 100) + 20;

    return {
      id: i++,
      firstName,
      lastName,
      email,
      age,
    };
  });

  return list;
}

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDocComponent {
  @ViewChild('tableRef') tableRef!: TableComponent;

  tableData = genFakeData(100);
}

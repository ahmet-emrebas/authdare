import { Component } from '@angular/core';

@Component({
  selector: 'app-table-doc',
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss'],
})
export class TableDocComponent {
  tableData = [
    { id: 1, firstName: 'Ahmet' },
    { id: 1, firstName: 'Ahmet' },
    { id: 1, firstName: 'Ahmet' },
  ];
}

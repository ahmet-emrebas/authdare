import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-doc',
  templateUrl: './form-doc.component.html',
  styleUrls: ['./form-doc.component.scss'],
})
export class FormDocComponent implements OnInit {
  onDestroy(formValue: { [key: string]: any }) {
    console.log(formValue);
  }
  constructor() {}

  ngOnInit(): void {}
}

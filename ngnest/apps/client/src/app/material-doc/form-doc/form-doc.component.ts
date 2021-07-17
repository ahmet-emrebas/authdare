import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-doc',
  templateUrl: './form-doc.component.html',
  styleUrls: ['./form-doc.component.scss'],
})
export class FormDocComponent implements OnInit {
  formGroup!: FormGroup;

  formFields = [
    {
      fieldName: 'firstName',
    },
    {
      fieldName: 'lastName',
    },
  ];
  onDestroy(formValue: { [key: string]: any }) {
    console.log(formValue);
  }
  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      this.formFields
        .map((e) => {
          return {
            [e.fieldName]: new FormControl('', []),
          };
        })
        .reduce((p, c) => ({ ...p, ...c })),
    );
  }
}

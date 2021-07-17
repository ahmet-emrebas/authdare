import { Component, OnInit } from '@angular/core';

let myFormState = {};

@Component({
  selector: 'app-form-doc',
  templateUrl: './form-doc.component.html',
  styleUrls: ['./form-doc.component.scss'],
})
export class FormDocComponent implements OnInit {
  formName = 'MyForm';
  state: any;
  ngOnInit(): void {
    this.state = myFormState;
  }

  storeState(formValue: any) {
    myFormState = formValue;
    console.log(formValue);
  }

  submit(formValue: any) {
    myFormState = formValue;
    console.log(formValue);
  }
}

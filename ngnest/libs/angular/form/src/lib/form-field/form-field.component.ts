import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DefaultErrorStateMatcher } from '../error-state-matcher';
import { FieldOptions } from '../form-options';

@Component({
  selector: 'authdare-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @Input() errorStateMatcher = new DefaultErrorStateMatcher();
  typingField = '';
  @Input() appearance!: MatFormFieldAppearance;
  @Input() attributes!: FieldOptions;
  loading = false;

  fieldType: string = 'text';

  ngOnInit(): void {
    const fieldType = this.attributes.type;

    if (!fieldType) {
      return;
    }

    if (fieldType == 'select') {
      this.fieldType = 'select';
      return;
    }

    if (fieldType == 'date') {
      this.fieldType = 'date';
    }

    if (fieldType == 'date-range') {
      this.fieldType = 'date-range';
    }
  }
}

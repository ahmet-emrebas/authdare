import { Component, Input } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DefaultErrorStateMatcher } from '../error-state-matcher';
import { FieldOptions } from '../form-options';

@Component({
  selector: 'authdare-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input() errorStateMatcher = new DefaultErrorStateMatcher();
  typingField = '';
  @Input() appearance!: MatFormFieldAppearance;

  /**
   * Input element attributes
   */
  @Input() attributes!: FieldOptions;

  loading = false;
}

import { Component, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DefaultErrorStateMatcher } from '../error-state-matcher';
import { FieldOptions } from '../form-options';

@Component({
  selector: 'authdare-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  /**
   * If not specified, default error state matcher will be used.
   * @type {ErrorStateMatcher}
   */
  @Input() errorStateMatcher: ErrorStateMatcher =
    new DefaultErrorStateMatcher();

  /**
   * Appearance fo the form field, 'legacy' | 'standard' | 'fill' | 'outline';
   * @type {MatFormFieldAppearance}
   */
  @Input() appearance!: MatFormFieldAppearance;

  /**
   * Input element attributes
   * @type {FieldOptions}
   */
  @Input() attributes!: FieldOptions;

  /**
   * Loading indicator for this form control.
   * When true, the form control is still loading,
   * When false, ready to display
   * @type {boolean}
   */
  loading: boolean = true;

  /**
   * Label property of the attributes will be used as visible name. Visible name is visible to users.
   * @returns {string}
   */
  visibleName(): string {
    return this.attributes.label;
  }

  /**
   * Convenience method to get the current value of the formControl, basiclly return the formControl.value
   * @returns {string}
   */
  value(): string {
    return this.attributes!.formControl!.value;
  }
}

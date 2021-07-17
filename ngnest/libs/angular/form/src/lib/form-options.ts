import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { toPairs } from 'lodash';

export interface HTMLInputElementExtras {
  /**
   * small defination of the field.
   */
  hint: string;

  /**
   * Input label
   */
  label: string;

  /**
   * Email validation
   */
  email?: boolean;

  /**
   * Each field must have a formcontrolname
   */
  formControlName: string;

  /**
   * FormControlInstance
   */
  formControl?: FormControl;

  /**
   * Options for the select field
   */
  options?: string[];

  /**
   * Define a dependent field that this field does not appeart till the dependent field is valid.
   */
  dependents?: string[];

  /**
   * Order of the field
   */
  order?: number;
}

export interface FieldOptions
  extends Partial<HTMLInputElement>,
    HTMLInputElementExtras {}

export interface FormOptions {
  /**
   * Unique identifier of the form
   */
  formName: string;

  /**
   * Visible title of the form
   */
  formTitle: string;

  /**
   * Input field appearance
   */
  appearance: MatFormFieldAppearance;

  /**
   * When true, only one input will be appear at a time
   */
  isSquenential?: boolean;

  /**
   * FormGroup instance
   */
  formGroup?: FormGroup;

  /**
   * Each input element, attributes, and features.
   */
  fieldOptionsList: FieldOptions[];
}

/**
 * Valiate the form options and set default values for the empty options.
 * @param {Partial<FormOptions>} formOptions
 */
export function validateAndTransformFormOptions(
  formOptions: Partial<FormOptions>,
) {
  if (!formOptions) {
    throw new Error('FormOptions required!');
  }
  const { formName, formTitle, appearance, fieldOptionsList } = formOptions;
  if (!formName) throw new Error('formName must set!');
  if (!formTitle) formOptions.formTitle = 'Undefined formTitle';
  if (!appearance) formOptions.appearance = 'outline';
  if (!fieldOptionsList) throw new Error('fieldOptions must set!');

  for (const field of fieldOptionsList) {
    if (!field.type) field.type = 'text';
    if (!field.formControlName) throw new Error('formControlName must set!');
    if (!field.label) throw new Error('label must set');
  }
}

/**
 * Create a FormControl instance and configure validators
 * @param {Partial<FieldOptions>} fieldOptionsList
 * @returns
 */
export function configureValidators(fieldOptionsList: Partial<FieldOptions>[]) {
  for (const fieldOptions of fieldOptionsList) {
    const validators = toPairs(fieldOptions)
      .filter(([key, value]) => (Validators as any)[key])
      .map(([key, value]) => {
        if (key == 'required') {
          return Validators.required;
        }
        if (key == 'email') {
          return Validators.email;
        }
        return (Validators as any)[key](value);
      });

    const formControl = new FormControl('...', []);

    formControl.setValidators(validators);

    fieldOptions.formControl = formControl;
  }

  return fieldOptionsList;
}

/**
 * Create a FormGroup instance and add the FormControls to it.
 * @param {Partial<FormOptions>} formOptions
 */
export function createFormGroup(formOptions: Partial<FormOptions>) {
  const formGroup = new FormGroup({});
  for (const field of formOptions.fieldOptionsList!) {
    formGroup.setControl(field.formControlName, field.formControl!);
  }
  formOptions.formGroup = formGroup;
  formOptions.fieldOptionsList!.forEach((e) => {
    // these are for initiating the render! Without the following setters, Input elements do not render somehow.
    setTimeout(() => {
      e.formControl?.setValue('.');
    });

    setTimeout(() => {
      e.formControl?.setValue('');
    }, 100);
  });
}

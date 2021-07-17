import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

// Validators
export class FormControlValidators {}

export class FormFieldOptions extends HTMLInputElement {
  /**
   * small defination of the field.
   */
  hint = '';

  /**
   * Input label
   */
  label = '';

  /**
   * Email validation
   */
  email?: boolean;

  /**
   * Each field must have a formcontrolname
   */
  formControlName = 'not set';

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

export class Form {}

export interface FormState {
  formName: string;
  formValue: { [key: string]: any };
  formConfig: any;
}

export const entityConfig = {
  pluralNames: {
    FormState: 'FormStates',
  },
  entityMetadata: {
    FormState: {},
  },
};

@Injectable({ providedIn: 'root' })
export class ChartService extends EntityCollectionServiceBase<FormState> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FormState', serviceElementsFactory);
  }
}

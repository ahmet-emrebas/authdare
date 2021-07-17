import { createAction, createReducer, on, props } from '@ngrx/store';
import { FormOptions } from './form-options';

export interface FormStoreFormOutput {
  formName: string;
  formData: { [key: string]: any };
}
export interface FormStoreState {
  submittedForms: FormStoreFormOutput[];
  options: Partial<FormOptions>[];
}
/**
 * Set the options
 */
export const setFormOptions = createAction(
  `[FORM MODULE] SET FORM OPTIONS`,
  props<FormOptions>(),
);

/**
 * Submit form by name
 */
export const submitForm = createAction(
  `[FORM MODULE] SUBMIT FORM`,
  props<FormStoreFormOutput>(),
);

export const formReducer = createReducer<FormStoreState>(
  {
    options: [],
    submittedForms: [],
  },
  on(setFormOptions, (state, payload) => {
    return {
      ...state,
      options: [
        ...state.options.filter((e) => e.formName !== payload.formName),
        payload,
      ],
    };
  }),
  on(submitForm, (state, payload) => {
    return {
      ...state,
      submittedForms: [
        ...state.submittedForms.filter((e) => e.formName != payload.formName),
        payload,
      ],
    };
  }),
);

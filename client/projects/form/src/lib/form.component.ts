import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { cloneDeep } from 'lodash';
import { map } from 'rxjs/operators';
import {
  configureValidators,
  createFormGroup,
  FormOptions,
  validateAndTransformFormOptions,
} from './form-options';
import {
  FormStoreState,
  setFormOptions,
  submitForm,
} from './form-store-actions';

const defaultForm: FormOptions = {
  formName: 'default',
  formTitle: 'Subscription',
  appearance: 'outline',

  fieldOptionsList: [
    {
      formControlName: 'firstName',
      type: 'text',
      label: 'First Name',
      autocomplete: 'given-name',
      minLength: 2,
      maxLength: 5,
      hint: 'Ahmet',
      required: true,
    },
    {
      formControlName: 'lastName',
      type: 'text',
      label: 'Last Name',
      autocomplete: 'given-name',
      minLength: 2,
      maxLength: 5,
      hint: 'Emrebas',
    },
    {
      formControlName: 'email',
      type: 'email',
      label: 'Email',
      autocomplete: 'email',
      email: true,
      hint: 'Emrebas',
      dependents: ['firstName', 'lastName'],
    },
    {
      formControlName: 'age',
      type: 'number',
      label: 'Age',
      autocomplete: 'given-name',
      min: '18',
      max: '41',
      hint: 'Emrebas',
    },
  ],
};

@Component({
  selector: 'authdare-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [fadeInOnEnterAnimation()],
})
export class FormComponent implements OnInit {
  /**
   * Visiblibity of the action buttons.
   */
  @Input() actionButtons = true;

  /**
   * Form Group referance
   */
  formGroup!: FormGroup;
  /**
   * Form identifier that helps to find the form configuration in store.
   */
  @Input() formName: string = 'default';

  /**
   * Visibility of the form header.
   */
  @Input() formHeader = true;

  /**
   * Form Options
   */
  options$ = this.store.pipe(
    map((s) => {
      const options = cloneDeep(
        s.form.options.find((e) => e.formName == this.formName)
      );
      if (options) {
        validateAndTransformFormOptions(options);
        configureValidators(options.fieldOptionsList!);
        createFormGroup(options);
        this.formGroup = options.formGroup!;
        return options;
      }
      throw new Error('formName must set!');
    })
  );

  constructor(
    private store: Store<{
      form: FormStoreState;
    }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setFormOptions(defaultForm));
  }

  submit(formName: string, formData: { [key: string]: any }) {
    console.log(formName, formData);
    this.store.dispatch(submitForm({ formName, formData }));
  }

  isDependentValid(dependents: string[]): boolean {
    if (!dependents) {
      return true;
    }
    return dependents
      .map((d) => this.formGroup.controls[d])
      .map((e) => e.valid && e.dirty)
      .reduce((p, c) => p && c);
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { cloneDeep } from 'lodash';
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
  appearance: 'outline',

  fieldOptionsList: [
    {
      controlName: 'firstName',
      type: 'text',
      label: 'First Name',
      autocomplete: 'given-name',
      minLength: 2,
      maxLength: 5,
      hint: 'Ahmet',
      required: true,
    },
    {
      controlName: 'email',
      type: 'email',
      label: 'Email',
      autocomplete: 'email',
      email: true,
      hint: 'Emrebas',
      dependents: ['firstName'],
    },

    {
      controlName: 'interests',
      type: 'select',
      label: 'Interests',
      autocomplete: 'interests',
      hint: 'select interests',
      options: [
        {
          label: 'First opton',
          value: 1,
        },
        {
          label: 'Second opton',
          value: 2,
        },
        {
          label: 'Third opton',
          value: 3,
        },
      ],
    },

    {
      controlName: 'birth',
      type: 'date',
      label: 'Age',
      hint: 'Date of birth',
    },

    {
      controlName: 'schedule',
      type: 'date-range',
      label: 'Slot',
      hint: 'Date of schedule',
    },
  ],
};

@Component({
  selector: 'authdare-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [fadeInOnEnterAnimation()],
})
export class FormComponent implements OnInit, OnDestroy {
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
  @Input() formTitle: string = '';
  /**
   * Visibility of the form header.
   */
  @Input() formHeader = true;

  @Input() options!: FormOptions;

  @Input() formOptions: FormOptions = defaultForm;

  @Input() state: any;

  @Output() onDestroy = new EventEmitter<{ [key: string]: any }>();

  @Output() onSubmit = new EventEmitter<{ [key: string]: any }>();

  constructor() {}

  ngOnInit(): void {
    const options = cloneDeep(this.formOptions);
    if (options) {
      validateAndTransformFormOptions(options);
      configureValidators(options.fieldOptionsList!);
      createFormGroup(options, this.state);
      this.formGroup = options.formGroup!;
      this.formOptions = options;
      return;
    }
    throw new Error('formOptions must set');
  }

  ngOnDestroy(): void {
    this.onDestroy.emit(this.formGroup.value);
  }

  submit() {
    this.onSubmit.emit(this.formGroup.value);
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

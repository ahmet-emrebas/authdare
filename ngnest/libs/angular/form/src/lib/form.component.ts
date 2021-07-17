import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { cloneDeep } from 'lodash';
import {
  configureValidators,
  createFormGroup,
  FormOptions,
  validateAndTransformFormOptions,
} from './form-options';
import { SubSink } from 'subsink';

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
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
  subsink = new SubSink();
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
  @Input() formName = 'default';

  /**
   * Visibility of the form header.
   */
  @Input() formHeader = true;

  @Input() formOptions!: FormOptions;

  @Output() onSubmit = new EventEmitter<{ [key: string]: any }>();

  @Output() onDestroy = new EventEmitter<{ [key: string]: any }>();

  constructor() {}
  ngAfterViewInit(): void {
    const options = cloneDeep(this.formOptions || defaultForm);
    validateAndTransformFormOptions(options);
    configureValidators(options.fieldOptionsList!);
    createFormGroup(options);

    this.formGroup = options.formGroup!;
    this.formOptions = options;
  }
  ngOnDestroy(): void {
    this.onDestroy.emit(this.formGroup.value);
  }

  ngOnInit(): void {
    const options = cloneDeep(this.formOptions || defaultForm);
    validateAndTransformFormOptions(options);
    configureValidators(options.fieldOptionsList!);
    createFormGroup(options);

    this.formGroup = options.formGroup!;
    this.formOptions = options;
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

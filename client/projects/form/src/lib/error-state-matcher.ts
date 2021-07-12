import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Default error state matcher for the forms
 */
export class DefaultErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control?.invalid && control?.touched && control?.dirty);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { keys } from 'lodash';

function trimSome(value: string) {
  if (value.length > 5) {
    return value.substr(0, 5) + '...';
  }
  return value;
}

@Pipe({
  name: 'validationError',
})
export class ValidationErrorPipe implements PipeTransform {
  transform(value: { [key: string]: any }, fieldName: string): string {
    if (!value) {
      return '';
    }

    if (value.minlength) {
      const err = value.minlength;
      return `${fieldName} should be at least ${err.requiredLength} characters but found ${err.actualLength}`;
    }

    if (value.maxlength) {
      const err = value.maxlength;
      return `${fieldName} should be at most ${err?.requiredLength} characters but found ${err?.actualLength}`;
    }
    if (value.min) {
      const err = value.min;
      return `${fieldName} should be at least ${err?.min} but found ${err?.actual}`;
    }
    if (value.max) {
      const err = value.max;
      return `${fieldName} should be at most ${err?.max} but found ${err?.actual}`;
    }

    if (value.email) {
      const err = value.email;
      return `${fieldName} should be a valid email.`;
    }

    if (value.required) {
      const err = value.required;
      return `${fieldName} is required!`;
    }

    return `Could not pass the validations, ${keys(value).join(', ')}`;
  }
}

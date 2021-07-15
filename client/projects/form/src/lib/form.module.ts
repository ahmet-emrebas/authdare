import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SetAttributeModule } from './set-attribute/set-attribute.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldComponent } from './text-field/text-field.component';
import { DateFieldComponent } from './date-field/date-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { FieldStatusComponent } from './field-status/field-status.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValidationErrorPipe } from './validation-error/validation-error.pipe';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormStoreModule } from './form-store.module';

@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    TextFieldComponent,
    DateFieldComponent,
    SelectFieldComponent,
    FieldStatusComponent,
    ValidationErrorPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    SetAttributeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
    FormStoreModule,
  ],
  providers: [],
  exports: [FormComponent],
})
export class FormModule {}

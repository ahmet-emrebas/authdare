import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './form-store-actions';

@NgModule({
  imports: [StoreModule.forFeature('form', formReducer)],
  exports: [StoreModule],
})
export class FormStoreModule {}

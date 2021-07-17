import { NgModule } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './form-store-actions';
import { entityConfig } from './form.service';

@NgModule({
  imports: [
    StoreModule.forFeature('form', formReducer),
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forFeature([]),
  ],
  exports: [StoreModule],
})
export class FormStoreModule {}

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

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

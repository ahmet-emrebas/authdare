import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';

export interface ChartState {
  id: number;
  isMedian: boolean;
  isMidrange: boolean;
  isMean: boolean;
}

const entityMetadata: EntityMetadataMap = {
  ChartState: {},
};

const pluralNames = {
  ChartState: 'ChartStates',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

@Injectable({ providedIn: 'root' })
export class ChartService extends EntityCollectionServiceBase<ChartState> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ChartState', serviceElementsFactory);
  }
}

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export interface TableItem {
  id: number;
  groupId: number;
  path?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class TableService extends EntityCollectionServiceBase<TableItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('TableItem', serviceElementsFactory);
  }
}

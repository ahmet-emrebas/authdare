import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export interface NavbarItem {
  id: number;
  type: 'INTERNAL' | 'EXTERNAL';
  path: string;
  icon: string;
  tooltip: string;
}
@Injectable({ providedIn: 'root' })
export class NavbarService extends EntityCollectionServiceBase<NavbarItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('NavbarItem', serviceElementsFactory);
  }
}

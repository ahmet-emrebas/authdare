import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export interface NavbarItem {
  id: number;
  path: string;
  icon: string;
}
@Injectable({ providedIn: 'root' })
export class NavbarService extends EntityCollectionServiceBase<NavbarItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('NavbarItem', serviceElementsFactory);
  }
}

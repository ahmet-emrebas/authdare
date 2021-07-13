import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export interface NavbarItem {
  id: number;
  type: 'INTERNAL' | 'EXTERNAL';
  groupId: number;
  order: number;
  path: string;
  icon: string;
  tooltip: string;
}
@Injectable({ providedIn: 'root' })
export class NavbarService extends EntityCollectionServiceBase<NavbarItem> {
  private _defaultGroup = 1;
  get defaultGroup() {
    return this._defaultGroup;
  }
  set defaultGroup(_defaultGroup: number) {
    this._defaultGroup = _defaultGroup;
  }
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('NavbarItem', serviceElementsFactory);
  }
}

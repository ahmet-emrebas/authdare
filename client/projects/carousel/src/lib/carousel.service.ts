import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { BehaviorSubject } from 'rxjs';

export class CarouselItem {
  id!: number;
  title!: string;
  summary!: string;
  content!: string;
  img!: string;
  actionLabel!: string;
  backgroundColor!: string;
  duration!: number;

  constructor(obj: Partial<CarouselItem>) {
    if (!obj.img) obj.img = 'assets/imgs/placeholder-1366x768-1.png';
    if (!obj.duration) obj.duration = 1000;
    Object.assign(this, obj);
  }
}

@Injectable({ providedIn: 'root' })
export class CarouselService extends EntityCollectionServiceBase<CarouselItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CarouselItem', serviceElementsFactory);
  }
}

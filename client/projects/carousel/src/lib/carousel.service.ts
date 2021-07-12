import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { BehaviorSubject } from 'rxjs';

export interface CarouselItem {
  id: number;
  groupId: number;
  title: string;
  summary: string;
  content: string;
  img: string;
  actionLabel: string;
  blendColor: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class CarouselService extends EntityCollectionServiceBase<CarouselItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CarouselItem', serviceElementsFactory);
  }
}

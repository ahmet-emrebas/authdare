import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { CarouselNavigation } from './carousel-navigation';


@Injectable({ providedIn: 'root' })
export class CarouselService extends EntityCollectionServiceBase<CarouselNavigation> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CarouselNavigation', serviceElementsFactory);
  }
}

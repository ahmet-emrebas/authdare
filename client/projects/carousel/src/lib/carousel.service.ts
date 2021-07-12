import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export interface CarouselItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  img: string;
  actionLabel: string;
  actionPath: string;
  actionHandler: () => void;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class CarouselService extends EntityCollectionServiceBase<CarouselItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CarouselItem', serviceElementsFactory);
  }
}

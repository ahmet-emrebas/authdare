import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export class CarouselItem {
  public id: number = -1;
  public groupId: number = -1;
  public title: string = '';
  public summary: string = '';
  public content: string = '';
  public img: string = '';
  public actionLabel: string = '';
  public backgroundColor: string = '';
  public duration: number = 3000;
  constructor(value: Partial<CarouselItem>) {
    Object.assign(this, value);
  }
}

export class CarouselNavigationState {
  index: number = 0;
  partialDistance: number = 0;
  isPlaying: boolean = true;
  constructor(value?: Partial<CarouselNavigationState>) {
    value && Object.assign(this, value);
  }
}

export class CarouselState {
  items: CarouselItem[] = [];
  navigation: CarouselNavigationState = new CarouselNavigationState();
}

@Injectable({ providedIn: 'root' })
export class CarouselService extends EntityCollectionServiceBase<CarouselItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CarouselItem', serviceElementsFactory);
  }
}

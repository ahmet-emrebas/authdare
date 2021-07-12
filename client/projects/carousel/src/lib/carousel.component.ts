import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { internet, lorem, datatype, image } from 'faker';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInLeftOnEnterAnimation,
  slideOutRightOnLeaveAnimation,
} from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarouselItem, CarouselService } from './carousel.service';

function calculateDashArray(wholeDistance: number, partialDeg: number) {
  let comp = Math.floor((wholeDistance / 360) * partialDeg);
  const result = `${comp} ${Math.floor(wholeDistance - comp)}`;
  return result;
}

function fakeCarouselItem(): CarouselItem {
  return {
    id: datatype.number(900),
    title: lorem.words(2),
    actionLabel: 'Action',
    blendColor: 'rgba(0, 0, 0,0.4)',
    summary: lorem.words(10),
    content: lorem.sentences(2),
    duration: datatype.number(10000),
    img: `assets/imgs/cars/1.png`,
  };
}

@Component({
  selector: 'authdare-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],

  animations: [
    slideInLeftOnEnterAnimation(),
    slideOutRightOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    bounceOutOnLeaveAnimation(),
    bounceInOnEnterAnimation(),
  ],
})
export class CarouselComponent implements OnInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  playing = true;

  carouselItems!: CarouselItem[];
  carouselItems$: Observable<CarouselItem[]> =
    this.carouselService.entities$.pipe(
      map((data) => {
        this.carouselItems = data;
        return data;
      })
    );

  visibleItemRef!: CarouselItem;

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.addManyToCache([
      fakeCarouselItem(),
      fakeCarouselItem(),
      fakeCarouselItem(),
    ]);

    setTimeout(() => {
      this.setVisibleTo(this.carouselItems[0], 0);
    }, 1000);
  }

  toStyleUrl(value: string): string {
    return `url('${value}')`;
  }

  intervalref!: any;
  cx = 50;
  cy = 50;
  r = 10;
  strokeDasharray = '';
  wholeDistance = 2 * Math.PI * this.r;
  loadedDistance = 0;
  fill = 'transparent';

  currentIndex = 0;

  /**
   * Scroll to the item that is supposed to be shown at that time.
   * @param index
   */
  setVisibleTo(
    elementRef: CarouselItem,
    index: number,
    fromUI: boolean = false
  ) {
    try {
      clearInterval(this.intervalref);
    } catch (err) {
      // DO nothign
    }

    if (fromUI) {
      this.loadedDistance = 0;
      this.playing = true;
    }

    this.currentIndex = index;
    this.visibleItemRef = elementRef;

    const clientWidth = this.container.nativeElement.clientWidth;
    this.container.nativeElement.scroll({
      behavior: 'smooth',
      left: clientWidth * index,
    });
    this.intervalref = setInterval(() => {
      this.loadedDistance++;
      this.strokeDasharray = calculateDashArray(
        this.wholeDistance,
        this.loadedDistance
      );
      if (this.loadedDistance >= 360) {
        clearInterval(this.intervalref);
        try {
          const cindex = index + 1;
          this.setVisibleTo(this.carouselItems[cindex], cindex);
        } catch (err) {
          this.setVisibleTo(this.carouselItems[0], 0);
        }
        this.loadedDistance = 0;
      }
    }, Math.floor((elementRef.duration || 1000) / 360));
  }

  play() {
    this.playing = true;
    this.setVisibleTo(this.carouselItems[this.currentIndex], this.currentIndex);
  }

  pause() {
    this.playing = false;
    setTimeout(() => {
      clearInterval(this.intervalref);
    });
  }
}

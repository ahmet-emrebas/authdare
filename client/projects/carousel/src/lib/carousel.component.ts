import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
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

@Component({
  selector: 'authdare-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],

  animations: [slideInLeftOnEnterAnimation(), slideOutRightOnLeaveAnimation()],
})
export class CarouselComponent implements OnInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

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
      new CarouselItem({
        id: 1,
        title: 'First title',
        summary: 'First sumamry ',
        content: 'First conntet',
        actionLabel: 'CLick me',
        duration: 3000,
        img: 'assets/imgs/cars/lamborghini-2.webp',
      }),
      new CarouselItem({
        id: 2,
        title: 'First title',
        summary: 'First sumamry ',
        content: 'First conntet',
        actionLabel: 'CLick me',
        duration: 1000,
        img: 'assets/imgs/cars/lamborghini-3.jpg',
      }),
      new CarouselItem({
        id: 3,
        title: 'First title',
        summary: 'First sumamry ',
        content: 'First conntet',
        actionLabel: 'CLick me',
        duration: 1000,
        img: 'assets/imgs/cars/lamborghini.png',
      }),
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
  r = 20;
  strokeDasharray = '';
  wholeDistance = 2 * Math.PI * this.r;
  loadedDistance = 0;
  fill = 'transparent';
  /**
   * Scroll to the item that is supposed to be shown at that time.
   * @param index
   */
  setVisibleTo(elementRef: CarouselItem, index: number) {
    try {
      clearInterval(this.intervalref);
    } catch (err) {
      // DO nothign
    }

    this.strokeDasharray = '';
    this.loadedDistance = 0;
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
      }
    }, Math.floor((elementRef.duration || 1000) / 360));
  }
}

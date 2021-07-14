import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInLeftOnEnterAnimation,
  slideOutRightOnLeaveAnimation,
} from 'angular-animations';
import { BehaviorSubject } from 'rxjs';
import { CarouselItem } from './carousel.service';

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

  carouselItems$ = new BehaviorSubject<CarouselItem[]>([]);
  @Input() carouselItems: Partial<CarouselItem>[] = [
    {
      title: 'Title',
      content: 'Content ',
      backgroundColor: 'black',
    },
    {
      img: '/assets/imgs/cars/1.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.carouselItems$.next(
      this.carouselItems.map((e) => new CarouselItem(e))
    );
  }

  scrollTo(index: number) {
    const clientWidth = this.container.nativeElement.clientWidth;
    this.container.nativeElement.scroll({
      behavior: 'smooth',
      left: clientWidth * index,
    });
  }
}

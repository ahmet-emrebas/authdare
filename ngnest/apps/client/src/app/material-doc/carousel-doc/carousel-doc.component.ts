import { Component, OnInit } from '@angular/core';
import { CarouselItem } from '@authdare/carousel';

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
  styleUrls: ['./carousel-doc.component.scss'],
})
export class CarouselDocComponent implements OnInit {
  carouselItems: Partial<CarouselItem>[] = [
    {
      title: 'Hello there!',
      content: '1 second',
      backgroundColor: 'black',
      duration: 1000,
    },
    {
      title: 'This is the second one!',
      content: '2 seconds',
      img: '/assets/imgs/cars/1.png',
      duration: 3000,
    },
    {
      title: '3000 Milliseconds!!',
      content: 'Wooow',
      img: '/assets/imgs/cars/1.png',
      duration: 3000,
    },
  ];

  carouselNavigationState = {
    stroke: 'white',
    currentIndex: 2,
    isPlaying: true,
    partialDistance: 0,
    strokeDasharray: '50 125',
    strokeWidth: 2,

    indexes: this.carouselItems.map((e) => ({
      duration: e.duration || 3000,
    })),
  };

  constructor() {}

  ngOnInit(): void {}
}

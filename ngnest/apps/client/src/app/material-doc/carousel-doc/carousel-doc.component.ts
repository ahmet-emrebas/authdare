import { Component, OnInit } from '@angular/core';
import { CarouselItem } from '@authdare/carousel';
import { getAsset } from '@authdare/utils/asset.pipe';

let state: any;

@Component({
  selector: 'app-carousel-doc',
  templateUrl: './carousel-doc.component.html',
  styleUrls: ['./carousel-doc.component.scss'],
})
export class CarouselDocComponent implements OnInit {
  carouselItems: Partial<CarouselItem>[] = [
    {
      title: 'Full Stack Software Development',
      summary:
        "Let's solve your busines problem with our amazing team! I think we are the fastest team in the world! Honestly, most of our clients do not need a software, they just like us! Would you like to enjoy being with us! Let's have fun solving your business problem with amazing people!",
      img: getAsset('/assets/imgs/fullstack.png'),
      backgroundColor: 'rgba(70, 0, 0,  0.7)',
      duration: 3000,
    },
    {
      title: 'I do not have my lambo yet!',
      summary: 'Could you please help me to get my lambo!',
      backgroundColor: 'rgba(70, 0, 0,  0.7)',
      img: getAsset('/assets/imgs/cars/1.png'),
      duration: 3000,
    },
    {
      title: 'Our Strength ',
      summary:
        'Node, Angular, Typescirpt, Javascript, Responsive Design, PWA, Complex Web Applications, Android Service and App development!',
      backgroundColor: 'rgba(70, 0, 0,  0.7)',
      img: getAsset('/assets/imgs/softwaredev.jpg'),
      duration: 3000,
    },
  ];

  carouselNavigationState: any;

  constructor() { }

  ngOnInit(): void {
    this.carouselNavigationState = state;
  }

  storeState(s: any) {
    state = s;
  }
}

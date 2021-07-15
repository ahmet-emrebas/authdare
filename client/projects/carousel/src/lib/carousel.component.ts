import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInLeftOnEnterAnimation,
  slideOutRightOnLeaveAnimation,
} from 'angular-animations';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import {
  CarouselNavigation,
  CarouselNavigationComponent,
} from './carousel-navigation/carousel-navigation.component';
import { CarouselService } from './carousel.service';

export class CarouselItem {
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

const defaultItems = [
  {
    title: 'Title',
    content: 'Content ',
    backgroundColor: 'black',
  },
  {
    img: '/assets/imgs/cars/1.png',
  },
];

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
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  subsink = new SubSink();

  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselNavigation')
  carouselNavigation!: CarouselNavigationComponent;

  @Input() id = 1;
  @Input() carouselItems: Partial<CarouselItem>[] = defaultItems;

  carouselNavigationState = new CarouselNavigation({});

  constructor(private service: CarouselService) {}
  ngAfterViewInit(): void {
    this.scrollTo(this.carouselNavigationState.currentIndex);
  }

  ngOnDestroy(): void {
    this.service.upsertOneInCache({
      ...this.carouselNavigation.state,
      id: this.id,
    });
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
    this.subsink.sink = this.service.entities$
      .pipe(map((e) => e.find((k) => k.id == this.id)))
      .subscribe((state) => {
        this.carouselNavigationState = new CarouselNavigation({
          ...state,
          indexes: this.carouselItems.map((e) => ({
            duration: e.duration || 3000,
          })),
        });
      });
  }

  scrollTo(index: number) {
    const clientWidth = this.container.nativeElement.clientWidth;
    this.container.nativeElement.scroll({
      behavior: 'smooth',
      left: clientWidth * index,
    });
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInLeftOnEnterAnimation,
  slideOutRightOnLeaveAnimation,
} from 'angular-animations';
import {
  CarouselNavigation,
  CarouselNavigationComponent,
} from './carousel-navigation/carousel-navigation.component';

export class CarouselItem {
  public title = '';
  public summary = '';
  public content = '';
  public img = '';
  public actionLabel = '';
  public backgroundColor = '';
  public duration = 3000;
  constructor(value: Partial<CarouselItem>) {
    Object.assign(this, value);
  }
}

const defaultItems: Partial<CarouselItem>[] = [
  {
    title: 'Title',
    content: 'Content ',
    backgroundColor: 'black',
    duration: 3000,
  },
  {
    img: '/assets/imgs/cars/1.png',
    duration: 3000,
  },
  {
    img: '/assets/imgs/cars/1.png',
    duration: 3000,
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
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselNavigation')
  carouselNavigation!: CarouselNavigationComponent;

  @Input()
  carouselItems: Partial<CarouselItem>[] = defaultItems;

  @Input() carouselNavigationState!: Partial<CarouselNavigation>;

  /**
   * Emits the current state of the component on destroy
   */
  @Output() onDestroy = new EventEmitter();

  ngOnInit(): void {
    if (!this.carouselNavigationState) {
      this.carouselNavigationState = new CarouselNavigation({
        stroke: 'white',
        currentIndex: 0,
        isPlaying: true,
        partialDistance: 0,
        strokeDasharray: '0',
        strokeWidth: 2,
        indexes: this.carouselItems.map(({ duration }) => ({
          duration: duration || 3000,
        })),
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.emit(this.carouselNavigation.state);
  }

  ngAfterViewInit(): void {
    this.scrollTo(this.carouselNavigationState.currentIndex || 0);
  }

  scrollTo(index: number) {
    const clientWidth = this.container.nativeElement.clientWidth;
    this.container.nativeElement.scroll({
      behavior: 'smooth',
      left: clientWidth * index,
    });
  }
}

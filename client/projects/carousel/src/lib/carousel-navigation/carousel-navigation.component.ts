import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { BehaviorSubject } from 'rxjs';

export interface CarouselNavigationState {}

@Component({
  selector: 'authdare-carousel-navigation',
  templateUrl: './carousel-navigation.component.html',
  styleUrls: ['./carousel-navigation.component.scss'],
  animations: [bounceInOnEnterAnimation()],
})
export class CarouselNavigationComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('destroying the carousel navaigation component');
  }
  /**
   * Emit the id of the carousel page.
   */
  @Output() onChange = new EventEmitter<number>();

  /**
   * Stores the corresponding indexes, from 0 to n, which will be emitted to on click
   */
  @Input() indexes: { duration: number }[] = [
    { duration: 1000 },
    { duration: 3000 },
    { duration: 10000 },
  ];

  /**
   * SVG circle cx attribute
   */
  cx = 50;

  /**
   * SVG circle cy attribute
   */
  cy = 50;

  /**
   * SVG circle r attribute
   */
  radius = 20;

  /**
   * SVG circle fill attribute
   */
  @Input() fill = 'transparent';

  /**
   * SVG circle stroke-width attribute
   */
  @Input() strokeWidth = 2;

  /**
   * SVG circle stroke attribute
   */
  @Input() stroke = 'black';

  /**
   * Current play-status of the navigation.
   */
  isPlaying$ = new BehaviorSubject<boolean>(true);

  /**
   * id of the currently navigated/playing item.
   */
  currentIndex = 0;

  /**
   * SVG Circle distance
   */
  wholeDistance = Math.floor(2 * Math.PI * this.radius);

  /**
   * SVG Circle drawn distnace
   */
  partialDistance = 0;

  /**
   * SVG Cirlce stroke-dasharry attribute
   */
  strokeDasharray = `0 ${this.wholeDistance}`;

  /**
   * Set the stroke-distancearray by partialDistance like '0 125'
   * @param {number} partialDistance
   */
  setStrokeDashArray(partialDistance: number): void {
    this.partialDistance = partialDistance;
    this.strokeDasharray = `${this.partialDistance} ${this.wholeDistance}`;
  }

  ngOnInit(): void {
    this.play();
  }

  /**
   * Interval referance to clear interval when animation stop.
   */
  intervalref!: any;

  /**
   * Start playing animation
   */
  play() {
    this.isPlaying$.next(true);

    clearInterval(this.intervalref);

    this.intervalref = setInterval(() => {
      if (!this.isPlaying()) {
        clearInterval(this.intervalref);

        return;
      }

      this.setStrokeDashArray(this.partialDistance + 1);
      if (this.partialDistance >= this.wholeDistance) {
        this.partialDistance = 0;
        if (this.currentIndex >= this.indexes.length - 1) {
          this.navigateTo(0);
        } else {
          this.navigateTo(this.currentIndex + 1);
        }
      }
    }, this.indexes[this.currentIndex].duration / this.wholeDistance);
  }

  /**
   * Pause the animation
   */
  pause() {
    this.isPlaying$.next(false);
  }

  /**
   * Play the next element with the corresponding index
   * @param {number} index
   */
  navigateTo(index: number) {
    this.onChange.emit(index);
    this.currentIndex = index;
    this.partialDistance = 0;
    this.strokeDasharray = `0 ${this.wholeDistance}`;
    this.play();
  }

  /**
   * Check the animation is playing or not.
   * @returns {boolean}
   */
  isPlaying(): boolean {
    return this.isPlaying$.getValue();
  }
}

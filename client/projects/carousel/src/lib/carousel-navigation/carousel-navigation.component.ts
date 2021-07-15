import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { bounceInOnEnterAnimation } from 'angular-animations';

export class CarouselNavigation {
  id = 1;
  indexes: { duration: number }[] = [
    { duration: 1000 },
    { duration: 1000 },
    { duration: 3000 },
    { duration: 3000 },
    { duration: 3000 },
    { duration: 3000 },
  ];
  fill = 'transparent';
  strokeWidth = 2;
  stroke = 'black';
  isPlaying = true;
  currentIndex = 0;
  partialDistance = 0;
  strokeDasharray = `0`;
  constructor(value?: Partial<CarouselNavigation>) {
    if (value) {
      Object.assign(this, value);
    }
  }
}

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
   * Current state of the component
   */
  @Input() state = new CarouselNavigation();

  /**
   * SVG circle cx attribute
   */
  readonly cx = 20;

  /**
   * SVG circle cy attribute
   */
  readonly cy = 20;

  /**
   * SVG circle r attribute
   */
  readonly radius = 15;

  /**
   * SVG Circle distance
   */
  readonly distance = Math.floor(2 * Math.PI * this.radius);

  /**
   * SVG Cirlce stroke-dasharry attribute
   */

  /**
   * Set the stroke-distancearray by partialDistance like '0 125'
   * @param {number} partialDistance
   */
  setStrokeDashArray(partialDistance: number): void {
    this.state.partialDistance = partialDistance;
    this.state.strokeDasharray = `${this.state.partialDistance} ${this.distance}`;
  }

  ngOnInit(): void {
    if (this.state.isPlaying) {
      this.play();
    }
  }

  /**
   * Interval referance to clear interval when animation stop.
   */
  intervalref!: any;

  /**
   * Start playing animation
   */
  play() {
    this.updateState({ isPlaying: true });
    clearInterval(this.intervalref);

    this.intervalref = setInterval(() => {
      if (!this.state.isPlaying) {
        clearInterval(this.intervalref);
        return;
      }

      this.setStrokeDashArray(this.state.partialDistance + 1);
      if (this.state.partialDistance >= this.distance) {
        this.state.partialDistance = 0;
        if (this.state.currentIndex >= this.state.indexes.length - 1) {
          this.navigateTo(0);
        } else {
          this.navigateTo(this.state.currentIndex + 1);
        }
      }
    }, this.state.indexes[this.state.currentIndex].duration / this.distance);
  }

  /**
   * Pause the animation
   */
  pause() {
    this.state.isPlaying = false;
  }

  /**
   * Play the next element with the corresponding index
   * @param {number} index
   */
  navigateTo(index: number) {
    this.onChange.emit(index);
    this.state.currentIndex = index;
    this.state.partialDistance = 0;
    this.state.strokeDasharray = `0 ${this.distance}`;
  }

  private updateState(state: Partial<CarouselNavigation>) {
    this.state = { ...this.state, ...state };
  }
}

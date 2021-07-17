import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';
@Component({
  selector: 'authdare-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss'],
  animations: [bounceInOnEnterAnimation(), bounceOutOnLeaveAnimation()],
})
export class TypingComponent implements OnInit {
  readonly control = new FormControl();

  @Input() rawSentence =
    'Put some dummy text here to type. This text should be space seperated words.';

  stat!: {
    corrects: number;
    wrongs: number;
    speed: number;
    duration: number;
  };

  words: {
    typed: string | undefined;
    correct: boolean | undefined;
    wrong: boolean | undefined;
    value: string;
  }[] = this.toWords(this.rawSentence);

  currentIndex = 0;
  timeCounter = 0;
  intervalRef: any;

  constructor() {}

  startCounter() {
    if (!this.intervalRef)
      this.intervalRef = setInterval(() => this.timeCounter++, 1000);
  }

  stopCounter() {
    clearInterval(this.intervalRef);
  }

  calculateStat() {
    this.stat = {
      corrects: this.words.filter((e) => e.correct).length,
      wrongs: this.words.filter((e) => e.wrong).length,
      speed:
        ~~(this.words.filter((e) => e.correct).length / this.timeCounter) * 60,
      duration: this.timeCounter,
    };
  }

  toWords(sentence: string) {
    return sentence.split(' ').map<{
      typed: string | undefined;
      correct: boolean | undefined;
      wrong: boolean | undefined;
      value: string;
    }>((e) => {
      return {
        typed: '',
        correct: undefined,
        wrong: undefined,
        value: e,
      };
    });
  }

  restart() {
    this.stat = null!;
    this.words = this.toWords(this.rawSentence);
    this.currentIndex = 0;
    this.timeCounter = 0;
    this.intervalRef = null;
  }

  ngOnInit(): void {
    const s = this.control.valueChanges.subscribe((value: string) => {
      this.startCounter();

      // Is there any more word left?
      if (this.currentIndex > this.words.length - 1) {
        this.stopCounter();
        this.calculateStat();
        console.log('there are not more words!');
        return;
      }

      if (value.endsWith(' ')) {
        // If value ends with space, it means the user will move to the next word.
        // Then we check the input value with the actual text using the currentIndex value, its initial value is 0.
        // So we need to clean the input field.
        console.log(value, '< Typed value');

        // Trimming the ending space.
        value = value.trim();

        // Comparing the words.
        if (value == this.words[this.currentIndex].value) {
          console.log('Correct');
          this.words[this.currentIndex].correct = true;
          this.words[this.currentIndex].typed = value;
        } else {
          this.words[this.currentIndex].wrong = true;
          this.words[this.currentIndex].typed = value;
          console.error(
            `Expected ${this.words[this.currentIndex].value} but found ${value}`
          );
        }

        // Incrementing the current index to go to next word if any
        this.currentIndex++;

        // Clean input field
        this.control.setValue('');
      }
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';

interface WordStat {
  id: number;
  typed: string | undefined;
  correct: boolean | undefined;
  wrong: boolean | undefined;
  value: string;
  timing: number | undefined;
}

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

  words: WordStat[] = this.toWords(this.rawSentence);

  currentIndex = 0;
  timeCounter = 0;
  eachWordTimeCounter: number | undefined = undefined;

  // Chart
  chartType = 'line';
  chartData = [];

  constructor() {}

  calculateStat() {
    this.stat = {
      corrects: this.words.filter((e) => e.correct).length,
      wrongs: this.words.filter((e) => e.wrong).length,
      duration: this.timeCounter / 1000,
      speed: ~~(
        (this.words.filter((e) => e.correct).length / this.timeCounter) *
        1000 *
        60
      ),
    };
  }

  toWords(sentence: string) {
    let index = 0;
    return sentence.split(' ').map<WordStat>((e) => {
      return {
        id: index++,
        value: e,
        typed: '',
        correct: undefined,
        wrong: undefined,
        timing: undefined,
      };
    });
  }

  restart() {
    this.stat = null!;
    this.words = this.toWords(this.rawSentence);
    this.currentIndex = 0;
    this.timeCounter = 0;
  }

  ngOnInit(): void {
    const s = this.control.valueChanges.subscribe((value: string) => {
      if (!this.timeCounter) {
        this.timeCounter = Date.now();
      }

      if (!this.eachWordTimeCounter) {
        this.eachWordTimeCounter = Date.now();
      }

      // Is there any more word left?
      if (this.currentIndex > this.words.length - 1) {
        this.timeCounter = Date.now() - this.timeCounter;
        this.calculateStat();
        console.log('there are not more words!');
        return;
      }

      if (value.endsWith(' ')) {
        // If value ends with space, it means the user will move to the next word.
        // Then we check the input value with the actual text using the currentIndex value, its initial value is 0.
        // So we need to clean the input field.
        console.log(value, '< Typed value');

        this.words[this.currentIndex].timing =
          Date.now() - this.eachWordTimeCounter;
        this.eachWordTimeCounter = undefined;

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

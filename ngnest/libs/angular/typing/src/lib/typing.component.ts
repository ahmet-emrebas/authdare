import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { ChartComponent } from '@authdare/chart';
import { BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { SubSink } from 'subsink';

// Sample text
const text = `As I tracked the history of the carbon cycle through geologic time to present day, most of the students were slumped over, dozing or looking at their phones. I ended my talk with a hopeful request for any questions.`;

interface WordStat {
  id: number;
  typed: string | undefined;
  correct: boolean | undefined;
  wrong: boolean | undefined;
  value: string;
  timing: number | undefined | string;
}

let chartState: ChartConfiguration | undefined;
let labelCount = 0;

function updateChartType(type: keyof ChartTypeRegistry) {
  chartState = { ...chartState, type } as any;
  return chartState;
}
function updateChartState(
  speed: number,
  correctWords: number,
  wrongWords: number
): ChartConfiguration {
  chartState = {
    type: chartState?.type || 'line',

    data: {
      labels: [...(chartState?.data.labels || []), labelCount++ + ''],
      datasets: [
        {
          label: 'Speed',
          data: [...(chartState?.data.datasets[0].data || []), speed],
          borderColor: 'rgba(39, 73, 146, 0.529)',
          backgroundColor: 'rgba(39, 73, 146, 0.529)',
        },
        {
          label: 'Correct Words',
          data: [...(chartState?.data.datasets[1].data || []), correctWords],
          borderColor: 'rgba(145, 240, 78, 0.529)',
          backgroundColor: 'rgba(145, 240, 78, 0.529)',
        },
        {
          label: 'Wrong Words',
          borderColor: 'rgba(255, 99, 71, 0.529)',
          backgroundColor: 'rgba(255, 99, 71, 0.529)',

          data: [...(chartState?.data.datasets[2].data || []), wrongWords],
        },
      ],
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };
  return chartState;
}

export interface PerformanceStat {
  corrects: number;
  wrongs: number;
  speed: number;
  duration: number;
}

@Component({
  selector: 'authdare-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss'],
  animations: [bounceInOnEnterAnimation(), bounceOutOnLeaveAnimation()],
})
export class TypingComponent implements OnInit, OnDestroy {
  subsink = new SubSink()
  @ViewChild('chartRef') chartRef!: ChartComponent;

  readonly control = new FormControl();

  @Input() rawSentence = text;

  @Output() onFinished = new EventEmitter<PerformanceStat>();

  stat!: PerformanceStat;

  words: WordStat[] = this.toWords(this.rawSentence);

  currentIndex = 0;
  timeCounter = 0;
  eachWordTimeCounter: number | undefined = undefined;

  chartConfig: ChartConfiguration | undefined;

  chartTypeFieldOptions = {
    controlName: 'none',
    control: new FormControl(''),
    label: 'Chart Type',
    hint: '',
    options: [
      {
        label: 'bar',
        value: 'bar',
      },
      {
        label: 'line',
        value: 'line',
      },
    ],
  };

  constructor() { }


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
    this.chartConfig = updateChartState(
      this.stat.speed,
      this.stat.corrects,
      this.stat.wrongs
    );
    this.onFinished.emit(cloneDeep(this.stat));
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
    this.control.enable();
    this.control.setValue('');
  }

  ngOnInit(): void {
    this.subsink.sink = this.control.valueChanges.subscribe((value: string) => {
      if (!this.timeCounter) {
        this.timeCounter = Date.now();
      }

      if (!this.eachWordTimeCounter) {
        this.eachWordTimeCounter = Date.now();
      }

      // Is there any more word left?
      if (this.currentIndex > this.words.length - 1) {
        if (this.control.disabled) {
          return;
        }
        this.timeCounter = Date.now() - this.timeCounter;
        this.calculateStat();
        this.control.disable();

        return;
      }

      if (value.endsWith(' ')) {
        // If value ends with space, it means the user will move to the next word.
        // Then we check the input value with the actual text using the currentIndex value, its initial value is 0.
        // So we need to clean the input field.

        this.words[this.currentIndex].timing = Math.floor(
          (60 * 1000) / (Date.now() - this.eachWordTimeCounter)
        );

        this.eachWordTimeCounter = undefined;

        // Trimming the ending space.
        value = value.trim();

        // Comparing the words.
        if (value == this.words[this.currentIndex].value) {
          this.words[this.currentIndex].correct = true;
          this.words[this.currentIndex].typed = value;
        } else {
          this.words[this.currentIndex].wrong = true;
          this.words[this.currentIndex].typed = value;
        }

        // Incrementing the current index to go to next word if any
        this.currentIndex++;

        // Clean input field
        this.control.setValue('');
      }
    });

    this.subsink.sink = this.chartTypeFieldOptions.control.valueChanges.subscribe((chartType) => {
      this.chartConfig = updateChartType(chartType);
      this.chartRef.chartConfig = this.chartConfig!;
      this.chartRef.initChart();
    });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  delayValue$ = new BehaviorSubject(false);

  delayValue(timeout: number, value: any) {
    if (this.delayValue$.getValue() == value) {
      return this.delayValue$;
    }
    setTimeout(() => {
      this.delayValue$.next(value);
    }, timeout);

    return this.delayValue$;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Chart, ChartConfiguration, ChartDataset, ChartType } from 'chart.js';

import * as chartjs$ from 'chart.js/auto';
import { filter, uniqBy, cloneDeep, max, min } from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';

const ___ = chartjs$.default;
const defaultConfig: ChartConfiguration = {
  type: 'line',

  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: 'Rain Amount',
        data: [900, 300, 500, 200, 50, 600],
        borderColor: 'cyan',
        backgroundColor: 'cyan',
        pointBorderColor: 'royalblue',
      },
    ],
  },
  options: {
    indexAxis: 'x',
    responsive: true,
  },
};

@Component({
  selector: 'authdare-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  configuration$ = new BehaviorSubject<ChartConfiguration<any, any, any>>(
    defaultConfig
  );
  chartInstance = new Chart('canvas', this.configuration$.getValue());

  ngOnInit(): void {
    const s = this.configuration$.subscribe(
      (config: ChartConfiguration<any>) => {
        this.chartInstance.destroy();
        this.chartInstance = new Chart('canvas', config);
      }
    );
    this.subs.push(s);
  }

  ngOnDestroy(): void {
    for (const s of this.subs) {
      s.unsubscribe();
    }
  }

  /**
   * Add a new configuration to the Chart
   * @param config
   */
  updateConfig(config: ChartConfiguration) {
    this.configuration$.next(config);
  }

  /**
   *
   * @returns the current configuration of the chart
   */
  getConfig() {
    return this.configuration$.getValue();
  }

  /**
   * Add new dataset to the chart so you can compare the data sets.
   * @param dataset
   */
  addDataset(dataset: ChartDataset) {
    const currentConfiguration = this.configuration$.getValue();
    currentConfiguration.data.datasets.push(dataset);
    this.updateConfig(currentConfiguration);
  }

  /**
   * set type of the chart like line, bubble etc.
   * @param {ChartType} ctype
   */
  setType(ctype: ChartType) {
    const cc = this.getConfig();
    cc.type = ctype;
    this.updateConfig(cc);
  }

  /**
   * Remove the chart by label (Setting label for each chart would be awesome)
   * @param label
   */
  removeByLabel(label: string) {
    const cv = this.getConfig();
    cv.data.datasets = filter(cv.data.datasets, (e) => e.label != label) as any;
    this.updateConfig(cv);
  }

  isMedian = false;
  /**
   * Display median value of the dataset in the first index.
   * @returns
   */
  medianLine() {
    const label = 'Median';
    const color = 'rgba(255,100,0,0.5)';
    if (this.isMedian) {
      this.removeByLabel(label);
      this.isMedian = !this.isMedian;
      return;
    }

    const cv = this.getConfig();
    const nds = cloneDeep(cv.data.datasets[0]);
    nds.label = label;
    const ndsData = nds.data;
    const l = nds.data.length;

    const median = ndsData.sort((a: number, b: number) => a - b)[
      Math.floor(l / 2)
    ];

    nds.data = new Array(nds.data.length).fill(median);
    nds.borderColor = color;
    nds.backgroundColor = color;

    cv.data.datasets.push(nds);
    cv.data.datasets = uniqBy(cv.data.datasets, 'label');
    this.updateConfig(cv);

    this.isMedian = !this.isMedian;
  }
  isMidrange = false;
  /**
   * Display midrange value of the dataset in the first index.
   * @returns
   */
  midrangeLine() {
    const label = 'Midrange';
    const color = 'rgba(255,200,50,0.5)';
    if (this.isMidrange) {
      this.removeByLabel(label);
      this.isMidrange = !this.isMidrange;
      return;
    }

    const cv = this.getConfig();
    const nds = cloneDeep(cv.data.datasets[0]);
    nds.label = label;
    const ndsData = nds.data as number[];

    const midrange = (min(ndsData)! + max(ndsData)!) / 2;

    nds.data = new Array(nds.data.length).fill(midrange);
    nds.borderColor = color;
    nds.backgroundColor = color;

    cv.data.datasets.push(nds);
    cv.data.datasets = uniqBy(cv.data.datasets, 'label');
    this.updateConfig(cv);

    this.isMidrange = !this.isMidrange;
  }

  isMean = false;
  /**
   * Display the Mean line of the dataset at the first index.
   */
  meanLine() {
    const label = 'Mean';
    const color = 'rgba(255,0,0,0.5)';
    if (this.isMean) {
      this.removeByLabel(label);
      this.isMean = !this.isMean;
      return;
    }

    const cv = this.getConfig();
    const nds = cloneDeep(cv.data.datasets[0]);
    nds.label = label;
    nds.data = new Array(nds.data.length).fill(
      nds.data.reduce((p: number, c: number) => p + c) / nds.data.length
    );
    nds.borderColor = color;
    nds.backgroundColor = color;
    cv.data.datasets.push(nds);
    cv.data.datasets = uniqBy(cv.data.datasets, 'label');
    this.updateConfig(cv);

    this.isMean = !this.isMean;
  }
}

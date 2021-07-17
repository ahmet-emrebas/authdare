import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Chart, ChartConfiguration, ChartDataset, ChartType } from 'chart.js';

import * as chartjs$ from 'chart.js/auto';
import { filter, uniqBy, cloneDeep, max, min } from 'lodash';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ChartService } from './chart.service';

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
  subsink = new SubSink();

  @Input() id = Date.now();
  @Input() chartConfig: ChartConfiguration<any, any, any> = defaultConfig;

  canvasId = 'canvas' + this.id;
  chartInstance!: Chart;
  isMedian = false;
  isMidrange = false;
  isMean = false;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    setTimeout(() => {
      try {
        this.chartInstance.destroy();
      } catch (err) {
        // If exist destroy!
      }

      this.subsink.sink = this.chartService.entities$
        .pipe(map((d) => d.find((e) => e.id == this.id)))
        .subscribe((state) => {
          this.isMidrange = state?.isMidrange || false;
          this.isMean = state?.isMean || false;
          this.isMedian = state?.isMedian || false;
        });
      this.chartInstance = new Chart(this.canvasId, this.chartConfig);
    }, 300);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();

    this.chartService.upsertOneInCache({
      id: this.id,
      isMean: this.isMean,
      isMedian: this.isMedian,
      isMidrange: this.isMidrange,
    });

    setTimeout(() => {
      this.chartInstance.destroy();
    });
  }

  /**
   * Add a new configuration to the Chart
   * @param config
   */
  updateConfig(config: ChartConfiguration) {
    this.chartConfig = { ...config };
    setTimeout(() => {
      try {
        this.chartInstance.destroy();
      } catch (err) {
        // If exist destroy!
      }
      this.chartInstance = new Chart(this.canvasId, this.chartConfig);
    }, 300);
  }

  /**
   * Add new dataset to the chart so you can compare the data sets.
   * @param dataset
   */
  addDataset(dataset: ChartDataset) {
    const currentConfiguration = this.chartConfig;
    currentConfiguration.data.datasets.push(dataset);
    this.updateConfig(currentConfiguration);
  }

  /**
   * set type of the chart like line, bubble etc.
   * @param {ChartType} ctype
   */
  setType(ctype: ChartType) {
    const cc = this.chartConfig;
    cc.type = ctype;
    this.updateConfig(cc);
  }

  /**
   * Remove the chart by label (Setting label for each chart would be awesome)
   * @param label
   */
  removeByLabel(label: string) {
    const cv = this.chartConfig;
    cv.data.datasets = filter(cv.data.datasets, (e) => e.label != label) as any;
    this.updateConfig(cv);
  }

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

    const cv = this.chartConfig;
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

    const cv = this.chartConfig;
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

    const cv = this.chartConfig;
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

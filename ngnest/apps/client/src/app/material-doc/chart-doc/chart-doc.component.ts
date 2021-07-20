import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { range } from 'lodash';
import { Chart } from 'chart.js';
import { ChartComponent } from '@authdare/chart';

import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-chart-doc',
  templateUrl: './chart-doc.component.html',
  styleUrls: ['./chart-doc.component.scss'],
})
export class ChartDocComponent implements OnInit, OnDestroy {
  @ViewChild('weatherChart') weatherChart!: ChartComponent;

  likesByDay: ChartConfiguration = {
    type: 'line',
    data: {
      labels: range(1, 50),
      datasets: [
        {
          borderColor: 'blue',
          data: new Array(50).fill(0).map((e) => ~~(Math.random() * 1000)),
          label: 'X Product',
        },
        {
          borderColor: 'orange',
          data: new Array(50).fill(0).map((e) => ~~(Math.random() * 1000)),
          label: 'Y Product',
        },
      ],
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    } as any,
  };

  currentWeather: ChartConfiguration = {
    type: 'line',

    data: {
      labels: ['current', ...new Array(50).fill('.')],
      datasets: [
        {
          borderColor: 'black',
          data: new Array(50).fill(0).map((e) => ~~(Math.random() * 50)),
          label: 'Heat(F)',
        },
        {
          borderColor: 'gray',
          data: new Array(50).fill(0).map((e) => ~~(Math.random() * 50)),
          label: 'Humidity',
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              reverse: true,
            },
          },
        ],
      },
      indexAxis: 'x',
      responsive: true,
      transition: {
        duration: 400,
      },

      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    } as any,
  };

  salesByYear: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: range(2018, 2021),
      datasets: [
        {
          backgroundColor: 'blue',
          data: new Array(3).fill(0).map((e) => ~~(Math.random() * 1000)),
          label: 'X Product Sale',
        },
        {
          backgroundColor: 'orange',
          data: new Array(3).fill(0).map((e) => ~~(Math.random() * 1000)),
          label: 'Y Product Sale',
        },
      ],
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    } as any,
  };
  constructor() {}

  interval: any;
  ngOnInit(): void {
    this.interval = setInterval(() => {
      // this.weatherChart.chartInstance.data.datasets[0].data.shift();
      this.weatherChart.chartInstance.data.datasets[0].data.unshift(
        ~~(Math.random() * 50) + 10
      );
      // this.weatherChart.chartInstance.data.datasets[1].data.shift();
      this.weatherChart.chartInstance.data.datasets[1].data.unshift(
        ~~(Math.random() * 50) + 10
      );
      this.weatherChart.chartInstance.update();
    }, 400);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

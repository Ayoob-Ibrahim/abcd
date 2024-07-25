import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
  fill: ApexFill;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  grid: ApexGrid
};

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.bar_chart_rendering([
      {
        x: 'Jan',
        y: [2800, 4500]
      },
      {
        x: 'Feb',
        y: [3200, 4100]
      },
      {
        x: 'Mar',
        y: [2950, 7800]
      },
      {
        x: 'Apr',
        y: [3000, 4600]
      },
      {
        x: 'May',
        y: [3500, 4100]
      },
      {
        x: 'June',
        y: [4500, 6500]
      },
    ],
      ['#EC7D31', '#36BDCB'],
      ['Female', 'Male']
    )
  }

  bar_chart_rendering(res, dumcolr, axisname) {
    this.chartOptions = {
      series: [
        {
          data: res
        }
      ],
      chart: {
        height: 350,
        type: 'rangeBar',
        zoom: {
          enabled: false
        }
      },
      colors: dumcolr,
      plotOptions: {
        bar: {
          horizontal: true,
          isDumbbell: true,
          dumbbellColors: [dumcolr]
        }
      },
      // title: {
      //   text: 'Bar Chart',
      //   color:'red',
      // },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'left',
        customLegendItems: axisname
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#36BDCB'],
          inverseColors: false,
          stops: [0, 100]
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      }
    };
  }


}

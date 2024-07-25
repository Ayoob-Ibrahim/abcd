import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};



@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.pie_chart_rendering({
      Colour: ['#36a7fb','#59edbb','#fecc6a','#836bd4','#ff4560'],
      Count: [44, 55, 41, 17, 15],
      Type: "pie"
    })
  }


  pie_chart_rendering(res) {
    let { Colour, Count, Type } = res;
    this.chartOptions = {
      series: Count,
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        // type: "gradient",
        colors: Colour
      },
      legend: {
        position: 'bottom',
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}

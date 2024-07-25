import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from '../../generic-components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../generic-components/bar-chart/bar-chart.component';
import { WaveChartComponent } from '../../generic-components/wave-chart/wave-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [PieChartComponent, BarChartComponent, WaveChartComponent, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  bar: boolean = true;
  wave: boolean = false;
  pie: boolean = false;
  ngOnInit(): void {
    setInterval(() => {
      this.bar = false
      this.pie = true
      this.wave = false
    }, 3000);
    setInterval(() => {
      this.bar = false
      this.pie = false
      this.wave = true
    }, 6000);
    setInterval(() => {
      this.bar = true
      this.pie = false
      this.wave = false
    }, 9000);
  }

}

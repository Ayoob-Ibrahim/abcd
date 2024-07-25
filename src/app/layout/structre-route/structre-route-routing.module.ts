import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayerComponent } from '../layer/layer.component';
import { AbcdGridComponent } from '../../generic-components/abcd-grid/abcd-grid.component';
import { ChartComponent } from '../../pages/chart/chart.component';

const routes: Routes = [

  {
    path: "chart",
    component: ChartComponent,
  },
];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class StructreRouteRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructreRouteRoutingModule } from './structre-route-routing.module';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { LayerComponent } from '../layer/layer.component';
import { ChartComponent } from '../../pages/chart/chart.component';
import { GridComponent } from '../../pages/grid/grid.component';
import { OpenLayerComponent } from '../../pages/open-layer/open-layer.component';
import { NotificationComponent } from '../../pages/notification/notification.component';
import { SvgIconsComponent } from '../../generic-components/svg-icons/svg-icons.component';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [SideBarComponent, NavBarComponent, BottomBarComponent
  ],
  imports: [
    SvgIconsComponent,
    CommonModule,
    StructreRouteRoutingModule,
    TranslateModule

  ],
  exports: [
    SideBarComponent, NavBarComponent,
    BottomBarComponent, CommonModule,
    StructreRouteRoutingModule,
    TranslateModule

  ]
})
export class StructreRouteModule { }

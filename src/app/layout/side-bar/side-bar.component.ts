import { Component } from '@angular/core';
import { Menulist } from '../../interface/menulist';
const menu = [
  {
    url: '/grid',
    icon: 'bi bi-grid-3x3 me-2',
    name: 'gridTable',
    collapse: false,
  },
  {
    url: '/chart',
    icon: 'bi bi-graph-up-arrow me-2',
    name: 'chartData',
    collapse: false,
  },
  {
    url: '/map',
    icon: 'bi bi-globe-americas me-2',
    name: 'openLayers',
    collapse: false,
  },
  {
    url: '/notification',
    icon: 'bi bi-bell-slash-fill me-2',
    name: 'notification',
    collapse: false,
  },
  {
    url: '/widgets',
    icon: 'bi bi-broadcast me-2',
    name: 'widgets',
    collapse: false,
  },
  {
    url: '/tree',
    icon: 'bi bi-diagram-3 me-2',
    name: 'Tree Hierarchy',
    collapse: false,
  },


]
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  menuList: Menulist[] = menu
}

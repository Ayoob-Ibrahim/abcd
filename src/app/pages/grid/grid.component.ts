import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbcdGridComponent } from '../../generic-components/abcd-grid/abcd-grid.component';
import { jqxComboBoxComponent, jqxComboBoxModule } from 'jqwidgets-ng/jqxcombobox';
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AbcdGridComponent, jqxComboBoxModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  @ViewChild('comboBoxReference') themecombo: jqxComboBoxComponent;
  abcd_grid_theme: string;
  GridInfo = {
    quarterGrid: { height: 280, rows: 3, setClass: "racDashboard" },
    halfGrid: { setClass: "racDashboard", height: 330, rows: 10 },
    fullgrid: { setClass: "rac__Dashboard", height: '65vh', rows: 10 },
  };

  comboboxdata: string[] = [
    'material',
    'base',
    'dark',
    'blackberry',
    'energyblue',
    'classic',
    'orange',
    'office',]

  themeselect(eve) {
    this.abcd_grid_theme = eve
  }
}

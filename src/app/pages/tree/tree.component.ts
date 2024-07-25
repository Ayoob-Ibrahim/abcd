import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbcdTreeComponent } from '../../generic-components/abcd-tree/abcd-tree.component';
import { CryptoService } from '../../service/crypto.service';
import { AbcdTreeGridComponent } from '../../generic-components/abcd-tree-grid/abcd-tree-grid.component';
import { jqxTreeGridComponent, jqxTreeGridModule, } from 'jqwidgets-ng/jqxtreegrid';
@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [AbcdTreeComponent, AbcdTreeGridComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent implements AfterViewInit {
  @ViewChild(AbcdTreeGridComponent, { static: false }) treeGridComponent: AbcdTreeGridComponent;

  treeGridData =  [
    {
        'id': '1', 'name': 'Corporate Headquarters', 'budget': '1230000', 'location': 'Las Vegas',
        'children':
        [
            {
                'id': '2', 'name': 'Finance Division', 'budget': '423000', 'location': 'San Antonio',
                'children':
                [
                    { 'id': '3', 'name': 'Accounting Department', 'budget': '113000', 'location': 'San Antonio' },
                    {
                        'id': '4', 'name': 'Investment Department', 'budget': '310000', 'location': 'San Antonio',
                        'children':
                        [
                            { 'id': '5', 'name': 'Banking Office', 'budget': '240000', 'location': 'San Antonio' },
                            { 'id': '6', 'name': 'Bonds Office', 'budget': '70000', 'location': 'San Antonio' },
                        ]
                    }
                ]
            },
            {
                'id': '7', 'name': 'Operations Division', 'budget': '600000', 'location': 'Miami',
                'children':
                [
                    { 'id': '8', 'name': 'Manufacturing Department', 'budget': '300000', 'location': 'Miami' },
                    { 'id': '9', 'name': 'Public Relations Department', 'budget': '200000', 'location': 'Miami' },
                    { 'id': '10', 'name': 'Sales Department', 'budget': '100000', 'location': 'Miami' }
                ]
            },
            { 'id': '11', 'name': 'Research Division', 'budget': '200000', 'location': 'Boston' }
        ]
    }
];

  treeGridColumns = [
    { text: 'Name', dataField: 'name', width: 250 },
    { text: 'Age', dataField: 'age', width: 250 }
  ];

  treeGridStyles = {
    'background-color': '#f0f0f0',
    'font-size': '14px'
  };

  ngAfterViewInit() {
    // const gridRef = this.treeGridComponent.getGridReference();
    // console.log('Grid Reference:', gridRef);
  }

  onTreeGridRendered() {
    console.log('TreeGrid has been rendered');
  }
}


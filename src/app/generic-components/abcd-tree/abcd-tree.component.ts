import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { jqxTreeComponent, jqxTreeModule } from 'jqwidgets-ng/jqxtree';
import { GeneralService } from '../../service/general.service';
@Component({
  selector: 'app-abcd-tree',
  standalone: true,
  imports: [jqxTreeModule],
  templateUrl: './abcd-tree.component.html',
  styleUrl: './abcd-tree.component.scss'
})
export class AbcdTreeComponent {
  @ViewChild('myTree', { static: false }) myTree: jqxTreeComponent;
  data: any[] = [

    {
      'id': 'super admin',
      'text': 'Super Admin',
      'parentid': 'super super admin',
      'value': 'super admin'
    },
    {
      'id': 'dashboard',
      'text': 'DashBoard',
      'parentid': 'super admin',
      'value': 'dashboard'
    },
    {
      'id': 'track history',
      'text': 'Track History',
      'parentid': 'super admin',
      'value': 'track history'
    },
    {
      'id': 'permit',
      'text': 'Permit',
      'parentid': 'super admin',
      'value': 'permit'
    },
    {
      'id': 'fleet',
      'text': 'Fleet',
      'parentid': 'super admin',
      'value': 'fleet'
    },
    {
      'id': 'company',
      'text': 'Company',
      'parentid': 'super admin',
      'value': 'company'
    },
    {
      'id': 'penalty',
      'text': 'Penalty',
      'parentid': 'super admin',
      'value': 'penalty'
    },














    {
      'id': '200',
      'text': 'second parent (Rowddy)',
      'parentid': '500',
      'value': '$2.3'
    },
    {
      'id': '11',
      'text': 'rowdy child 1',
      'parentid': '200',
      'value': '$2.3'
    },
    {
      'id': '22',
      'text': 'rowdy child 2',
      'parentid': '200',
      'value': '$2.3'
    },




  ]
  // prepare the data
  source = {
    datatype: 'json',
    datafields: [
      { name: 'id' },
      { name: 'parentid' },
      { name: 'text' },
      { name: 'value' }
    ],
    id: 'id',
    localdata: this.data
  };
  // create data adapter & perform Data Binding.
  dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
  // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents 
  // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter 
  // specifies the mapping between the 'text' and 'label' fields.  
  records: any = this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

  constructor() { }
  ngAfterViewInit(): void {
    // this.myTree.getItems().forEach(treeItem => {
    //   let treeElement: HTMLLIElement = treeItem.element;
    //   treeElement.getElementsByTagName('div')[0].appendChild(this.plusIcon(treeItem.element.id));
    // })

  }
  iconClicked(event, myTree: jqxTreeComponent) {
    console.log(event.target.id);
    let id = event.target.id.split('-')[0];
    let internalDivSpans = document.getElementsByClassName('tree-options-span');
    for (let index = 0; index < internalDivSpans.length; index++) {
      internalDivSpans.item(index).remove();
    }
    let liDiv: ChildNode;
    document.getElementById(id).childNodes.forEach(node => {
      if (node.nodeName == 'DIV') liDiv = node;

    });

    liDiv.after(this.treeOptionsHmtl(id));
    //  console.log(liDiv);


    // myTree.getItems().forEach(item => {
    //   let treeEL = item.element as HTMLLIElement;
    //   if (treeEL.id == id) {
    //     treeEL.append(this.treeOptionsHmtl(id));
    //     treeEL.style.display = 'flex';
    //     treeEL.style.alignItems = 'center';
    //   } else (treeEL as HTMLLIElement).style.display = 'revert'
    // })

    // console.log(treeEl,'treeItem');

  }
  plusIcon(id) {
    let img = document.createElement('img');
    img.src = '../../../assets/img/icons/plus-icon.png';
    img.id = `${id}-icon`;
    img.className = `tree-plus-icon `;
    img.addEventListener('click', (event) => {
      this.iconClicked(event, this.myTree);
    });
    return img;
  }

  treeOptionsHmtl(id, option1 = 'Create Sibiling', option2 = 'Create Child', option3 = 'Create Permission') {
    // create div tag and append theree span as child child class as tree-options 
    // id as unique for identify cliked one

    let parentSpan = document.createElement('div');
    parentSpan.className = `tree-options-span tree-options-span-${id}`;
    let options = [
      {
        id: 'sibiling',
        text: option1,
        class: 'tree-options'
      },
      {
        id: 'child',
        text: option2,
        class: 'tree-options'
      },
      {
        id: 'permission',
        text: option3,
        class: 'tree-options'
      },
    ]
    options.forEach(option => {
      let optionSpan = document.createElement('span');
      optionSpan.innerText = option.text;
      optionSpan.className = option.class;
      parentSpan.appendChild(optionSpan);
    });
    parentSpan.addEventListener('click', this.optionClicked);
    return parentSpan;
  }
  optionClicked(event) {
    console.log(event.target, 'optionsf')
  }
  treeOnSelect(event) {
    let targetId = event.args.element.id;
    console.log(event);

    this.myTree.getItems().forEach(treeItem => {
      if (targetId == treeItem.element.id) {
        let treeElement: HTMLLIElement = treeItem.element
        // console.log(treeElement.getElementsByClassName('jqx-tree-item')[0],'label');
      }
    })
    console.log(event.args.element.id);


  }
  optionsHtml() {
    return `
    
    `
  }
  test() {
    console.log(this.myTree.getItems())
  }


}

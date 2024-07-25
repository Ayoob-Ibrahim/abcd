import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WidgetListComponent } from '../../generic-components/widget-list/widget-list.component';
import { Item } from '../../interface/menulist';
import { animationsliderwidgetleft, animationsliderwidgetsright } from '../../animation/animation';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../service/general.service';



@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [CommonModule,
    WidgetListComponent,
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
  animations: [animationsliderwidgetleft, animationsliderwidgetsright]
})
export class WidgetsComponent implements OnInit, OnDestroy {
  @ViewChild('myDiv') myDiv: ElementRef;

  widgets_overview: Item[] = [
    {
      name: 'Dashboard',
      icon: 'bi bi-speedometer2',
      count: 5
    },
    {
      name: 'Users',
      icon: 'bi bi-people',
      count: 12
    },
    {
      name: 'Messages',
      icon: 'bi bi-chat',
      count: 8
    },
    {
      name: 'Notifications',
      icon: 'bi bi-bell',
      count: 3
    },
    {
      name: 'Pending Req',
      icon: 'bi bi-hourglass-split',
      count: 7
    },
    {
      name: 'Profile',
      icon: 'bi bi-person',
      count: 4
    },
    {
      name: 'Tasks',
      icon: 'bi bi-check2-square',
      count: 10
    },
    {
      name: 'Reports',
      icon: 'bi bi-file-earmark-text',
      count: 2
    },
    {
      name: 'Help',
      icon: 'bi bi-question-circle',
      count: 9
    }
  ];
  viewMode: string;
  currentview: number = 0
  sliderdir: string;
  private langBehavior: Subscription;
  direction: string = 'en';
  constructor(private renderer: Renderer2, private general: GeneralService) { }
  ngOnInit(): void {
    this.TemplateViewChanger(2, 'right');
    this.languageGetter()
  }

  languageGetter(): void {
    this.langBehavior = this.general.languagetter().subscribe(data => {
      this.direction = data;
    })
  }

  TemplateViewChanger(frwd_back: number, dir: string) {

    let widgetsarr = ['slidder_widget', 'card_icon_widget', 'widget_card_rounded_corner'];
    if (this.currentview == 0 && frwd_back == -1) {
      this.currentview = widgetsarr.length - 1
    }
    else if (this.currentview == widgetsarr.length - 1 && frwd_back == +1) {
      this.currentview = 0
    }
    else {
      this.currentview = this.currentview + frwd_back
    }
    this.viewMode = widgetsarr[this.currentview];
  }


  isLeft: boolean = false;

  getAnimationState(animation: string): string {
    if (animation === 'left') {
      return this.isLeft ? 'enter' : 'leave';
    } else if (animation === 'right') {
      return this.isLeft ? 'leave' : 'enter';
    }
    return 'leave';
  }


  ngOnDestroy(): void {
    if (this.langBehavior) {
      this.langBehavior.unsubscribe();
    }
  }


}

import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-widget-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-list.component.html',
  styleUrl: './widget-list.component.scss'
})
export class WidgetListComponent {
  @Input() widgetlist: any = []
  @Input() widgetType: string

}

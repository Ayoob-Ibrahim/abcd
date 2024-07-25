import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icons.component.html',
  styleUrl: './svg-icons.component.scss'
})
export class SvgIconsComponent {
  svgicon: string;
  @Input() public get svgType(): string {
    return this.svgicon;
  }

  public set svgType(data) {
    this.svgicon = data;
  }

}

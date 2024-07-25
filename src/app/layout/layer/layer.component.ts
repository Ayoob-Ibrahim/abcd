import { AfterViewInit, Component, HostBinding, inject, OnInit, Renderer2 } from '@angular/core';

import { Menulist } from '../../interface/menulist';
import { StructreRouteModule } from '../structre-route/structre-route.module';
import { ChildrenOutletContexts, Router, RouterModule, RouterOutlet } from '@angular/router';
import { StructreRouteRoutingModule } from '../structre-route/structre-route-routing.module';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from '../../service/general.service';
import { slideInAnimation } from '../../animation/animation';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layer',
  imports: [StructreRouteModule, CommonModule],
  standalone: true,
  templateUrl: './layer.component.html',
  styleUrl: './layer.component.scss',
  animations: [
    slideInAnimation
  ]
})
export class LayerComponent implements OnInit {

  private route: Router = inject(Router);
  private commonService: GeneralService = inject(GeneralService)
  private trasnServ: TranslateService = inject(TranslateService);
  private renderer: Renderer2 = inject(Renderer2)
  constructor(private contexts: ChildrenOutletContexts) { }


  ngOnInit(): void {
    this.languagecontrol()
  }

  languagecontrol() {
    this.trasnServ.use(sessionStorage['language'])
    this.commonService.languagesetter()
    this.commonService.languageInitilazation(this.renderer);
  }


  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}

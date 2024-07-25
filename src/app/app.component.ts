import { Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { LayerComponent } from './layout/layer/layer.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateCustomModule } from './translate-custom/translate-custom.module';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from './service/general.service';
import { AuthService } from './service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayerComponent,
    HttpClientModule,
    TranslateCustomModule, 
    
     
  ],
  // providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  constructor(private commonService: GeneralService, private trasnServ: TranslateService, private elementRef: ElementRef,
    private renderer: Renderer2,) {
    this.transaltioncore(['en', 'ar'], 'en')
  }


  ngOnInit(): void {

  }
  transaltioncore(supportlang: string[], defaultlang: string): void {
    this.trasnServ.addLangs(supportlang);
    this.trasnServ.setDefaultLang(defaultlang);
    const browserLangu: any = this.trasnServ.getBrowserLang();
    this.trasnServ.use(browserLangu)
  }




}

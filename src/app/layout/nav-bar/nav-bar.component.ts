import { Component, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { GeneralService } from '../../service/general.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {

  cur_lang: string = sessionStorage['language'] || 'en';
  generalser: GeneralService = inject(GeneralService);
  direction = signal<string>('en');
  private langBehavior: Subscription;
  private router: Router = inject(Router);
  private trasnServ: TranslateService = inject(TranslateService);
  private renderer: Renderer2 = inject(Renderer2)


  ngOnInit(): void {
    this.languageInitializer();
    this.languageGetter()
  }


  ngOnDestroy(): void {
    if (this.langBehavior) {
      this.langBehavior.unsubscribe();
    }
  }


  languageGetter(): void {
    this.langBehavior = this.generalser.languagetter().subscribe(data => {
      this.direction.set(data);
    })
  }

  languagecontrol() {
    sessionStorage['language'] = sessionStorage['language'] == 'ar' ? 'en' : 'ar';
    this.cur_lang = sessionStorage['language']
    this.trasnServ.use(sessionStorage['language'])
    this.languageInitializer()
  }

  languageInitializer() {
    this.generalser.languageInitilazation(this.renderer);
    this.generalser.languagesetter()
  }
  logout() {
    this.generalser.logout();
  }




}

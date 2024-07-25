import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateCustomModule } from './translate-custom/translate-custom.module';
import { AuthService } from './service/auth.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
    AuthService,
  provideAnimationsAsync(),
  importProvidersFrom(TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => {
        return new TranslateHttpLoader(http)
      },
      deps: [HttpClient]
    }
  }),
    // AppComponent,
  )

  ]
};
 

import { NgModule } from '@angular/core';

// Core Module
import { CoreModule } from './@core/core.module';

// Components
import { AppComponent } from './app.component';

// Misc
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    TranslateModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

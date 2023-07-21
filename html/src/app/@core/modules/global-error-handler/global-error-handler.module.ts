import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorModalComponent } from './components/error-handler/error-handler.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalFontAwesomeModule } from '../global-font-awesome/global-font-awesome.module';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    GlobalFontAwesomeModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ],
  declarations: [ErrorModalComponent],
})
export class GlobalErrorHandlerModule { }

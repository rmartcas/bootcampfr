import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../notification/notification.service';
import { Router } from '@angular/router';
import { UndefinedApiError } from '../../model/undefined-api-error';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {


  constructor(private readonly injector: Injector) { }

  handleError(wrapperError: any | HttpErrorResponse): void {
    const error = wrapperError.rejection ? wrapperError.rejection : wrapperError;
    const notify = this.injector.get(NotificationService);
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        const message = error.error ? error.error.message : 'i18n.error.' + error.status;
        const errors = error.error ? error.error.errors : null;
        notify.error(null, message, false, errors);
      } else if (error.status === 403) {
        const router = this.injector.get(Router);
        const zone = this.injector.get(NgZone);
        zone.run(() => {
          router.navigateByUrl('/403');
        });
      } else if (error.status === 404) {
        const router = this.injector.get(Router);
        const zone = this.injector.get(NgZone);
        zone.run(() => {
          router.navigateByUrl('/404');
        });
      } else if (error.status !== 200) {
        notify.error('i18n.error.' + error.status, 'i18n.error.title');
      }
    } else if (error instanceof UndefinedApiError) {
      const router = this.injector.get(Router);
      const zone = this.injector.get(NgZone);
      zone.run(() => {
        router.navigateByUrl('/403');
      });
    } else {
      notify.error('i18n.error.500', 'i18n.error.title', false);
    }
  }

}

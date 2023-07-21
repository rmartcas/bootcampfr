import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable()
export class RecaptchaInterceptor implements HttpInterceptor {

  constructor(private readonly config: AppConfigService, private readonly injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check for captcha header
    const headerName = this.config.getConfig().recaptcha?.headerName;
    if (headerName !== undefined && request.headers.get(headerName) !== null) {
      // Hay header y tiene un action
      const destroy$ = new Subject();
      const captchaService = this.injector.get(ReCaptchaV3Service);
      return captchaService.execute(request.headers.get(headerName)).pipe(
        takeUntil(destroy$),
        mergeMap((token)=> {
          const r = request.clone({
            headers: request.headers.set(headerName, token)
          });
          destroy$.next(token);
          destroy$.unsubscribe();
          return next.handle(r);
        }));
    } else {
      return next.handle(request);
    }
  }
}

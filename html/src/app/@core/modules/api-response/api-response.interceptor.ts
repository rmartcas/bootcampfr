import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ApiResponse } from '../../common/model/api-response';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {

  private resfreshFinished = true;

  constructor(private readonly appConfig: AppConfigService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const apiResponse: ApiResponse<any> = event.body;
          if (null !== apiResponse) {
            if (true === apiResponse.refresh && this.resfreshFinished === true) {
              console.log('Prepare refresh process');
              this.resfreshFinished = false;
              const destroy$ = new Subject();
              this.appConfig.load().pipe(takeUntil(destroy$)).subscribe(() => {
                this.resfreshFinished = true;
                console.log('Refresh process complete');
                destroy$.next(this.resfreshFinished);
                destroy$.unsubscribe();
              });
            }
            return event.clone({ body: apiResponse.response });
          }
        }
        return event;
      })
    );
  }
}

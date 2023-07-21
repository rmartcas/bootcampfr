import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CsrfHeaderInterceptorInterceptor implements HttpInterceptor {

  private csrf = '';

  private readonly csrfTokenHeader = 'X-CSRF-TOKEN';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    if (this.csrf !== '') {
      const r = request.clone({
        headers: request.headers.set(this.csrfTokenHeader, this.csrf)
      });
      req = r;
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const token = event.headers.has(this.csrfTokenHeader);
          if (token) {
            this.csrf = event.headers.get(this.csrfTokenHeader);
          }
        }
        return event;
      })
    );
  }
}

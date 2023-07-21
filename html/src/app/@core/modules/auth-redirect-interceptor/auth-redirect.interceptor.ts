import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthRedirectInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ( error.status === 200
          && error.headers.get('content-type').indexOf('text/html') !== -1
          && (error.error.text.indexOf('SAMLRequest') !== -1 || error.url.indexOf('SAMLRequest') !== -1)) {
          window.location.href = environment.api.base;
        }
        return throwError(() => error);
      })
    );
  }
}

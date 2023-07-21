import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AjaxWaitInterceptor } from './ajax-wait.interceptor';
import { RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Simple test service that will not in the actual app
@Injectable()
export class TestService {
  rootUrl = `http://mockhost`;

  constructor(private readonly http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(`${this.rootUrl}/posts`).pipe(delay( 4500 ));
  }
}

describe('AjaxWaitInterceptor', () => {
  let httpMock: HttpTestingController;
  let testService: TestService;
  let ajaxWaitService: NgxSpinnerService;
  let httpRequest: TestRequest;

  let subs: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AjaxWaitInterceptor,
          multi: true
        }
      ],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
    });

    testService = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);
    ajaxWaitService = TestBed.inject(NgxSpinnerService);
  });

  afterEach(() => {
    if (subs !== undefined) {
      subs.unsubscribe();
    }
  });

  it('+ intercept: El interceptor llama a NgxSpinnerService.show() y NgxSpinnerService.hide()', () => {
    // Creamos el spy para la llamada show:
    const ajaxWaitServiceShowSpy = spyOn(ajaxWaitService, 'show');

    // Creamos el spy para la llamada hide:
    const ajaxWaitServiceHideSpy = spyOn(ajaxWaitService, 'hide');

    // Invocamos al servicio de test que hará la petición http.
    subs = testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
      expect(ajaxWaitServiceShowSpy).toHaveBeenCalledBefore(ajaxWaitServiceHideSpy);
      expect(ajaxWaitServiceHideSpy).toHaveBeenCalled();
    });

    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({});
    expect().nothing();
  });
});

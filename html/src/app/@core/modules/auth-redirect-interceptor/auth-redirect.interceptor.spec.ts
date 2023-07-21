import { TestBed } from '@angular/core/testing';

import { AuthRedirectInterceptor } from './auth-redirect.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';

// Simple test service that will not in the actual app
@Injectable()
export class TestService {
  rootUrl = `http://mockhost`;

  constructor(private readonly http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(`${this.rootUrl}/posts`);
  }
}

describe('AuthRedirectInterceptor', () => {
  let httpMock: HttpTestingController;
  let testService: TestService;
  let httpRequest: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestService,
        AuthRedirectInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthRedirectInterceptor,
          multi: true
        }
      ],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
    });

    testService = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    const interceptor: AuthRedirectInterceptor = TestBed.inject(AuthRedirectInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('HttpResponse without html should not refresh window location', () => {
    // Invocamos al servicio de test que hará la petición http.
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({ response: 'The response' });
  });

  it('HttpResponse with others erros should not refresh window location', () => {
    // Invocamos al servicio de test que hará la petición http.
    testService.getPosts().subscribe(response => {
      expect(response).toBeUndefined();
    }, error => {
      expect(error).toBeTruthy();
    });

    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
});

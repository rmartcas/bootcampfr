import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CsrfHeaderInterceptorInterceptor } from './csrf-header-interceptor.interceptor';

// Simple test service that will not in the actual app
@Injectable()
export class TestService {
  rootUrl = `http://mockhost`;

  constructor(private readonly http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(`${this.rootUrl}/posts`, {observe: 'response'});
  }
}

describe('CsrfHeaderInterceptorInterceptor', () => {
  let httpMock: HttpTestingController;
  let testService: TestService;
  const CSRF_TOKEN_HEADER = 'X-CSRF-TOKEN';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestService,
        CsrfHeaderInterceptorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CsrfHeaderInterceptorInterceptor,
          multi: true
        }
      ],
      imports: [HttpClientTestingModule]
    });
    testService = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: CsrfHeaderInterceptorInterceptor = TestBed.inject(CsrfHeaderInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not add csrf header when csrf is empty', () => {
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest: TestRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    expect(httpRequest.request.headers.get(CSRF_TOKEN_HEADER)).toBe(null);
  });

  it('should store csrf header when csrf is in response', () => {
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.headers.get(CSRF_TOKEN_HEADER)).toBe('6789');
    });

    const httpRequest: TestRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    expect(httpRequest.request.headers.get(CSRF_TOKEN_HEADER)).toBe(null);
    const headers = {};
    headers[CSRF_TOKEN_HEADER] = '6789';
    httpRequest.flush('the response', { status: 200, statusText: 'OK', headers });

    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.headers.get(CSRF_TOKEN_HEADER)).toBe('9999');
    });

    const httpRequest2 = httpMock.expectOne(`${testService.rootUrl}/posts`);
    expect(httpRequest2.request.headers.get(CSRF_TOKEN_HEADER)).toBe('6789');
    headers[CSRF_TOKEN_HEADER] = '9999';
    httpRequest2.flush('the response', { status: 200, statusText: 'OK', headers });
  });
});

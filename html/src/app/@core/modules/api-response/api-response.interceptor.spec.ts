import { TestBed } from '@angular/core/testing';

import { ApiResponseInterceptor } from './api-response.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config/app-config.service';
import { of } from 'rxjs';

// Simple test service that will not in the actual app
@Injectable()
export class TestService {
  rootUrl = `http://mockhost`;

  constructor(private readonly http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(`${this.rootUrl}/posts`);
  }
}

describe('ApiResponseInterceptor', () => {
  let httpMock: HttpTestingController;
  let testService: TestService;
  let httpRequest: TestRequest;

  const mockConfigService: any = jasmine.createSpyObj('ConfigService', ['load', 'getConfig']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppConfigService, useValue: mockConfigService },
        TestService,
        ApiResponseInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiResponseInterceptor,
          multi: true
        }
      ],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
    });

    testService = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(console, 'log');
  });

  it('should be created', () => {
    const interceptor: ApiResponseInterceptor = TestBed.inject(ApiResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('HttpResponse with response body should extract the original object', () => {

    // Invocamos al servicio de test que hará la petición http.
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({ response: 'Test response' });
  });

  it('HttpResponse with refresh = true should refresh app config', () => {
    mockConfigService.load.and.returnValue(of({}));
    // Invocamos al servicio de test que hará la petición http.
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({ response: 'Test response', refresh: true });
  });

});

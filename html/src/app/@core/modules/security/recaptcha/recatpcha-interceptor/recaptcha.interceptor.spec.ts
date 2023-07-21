import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { of } from 'rxjs';
import { Config } from '../../../../common/model/config';
import { AppConfigService } from '../../../app-config/app-config.service';
import { initializeRecaptcha } from '../recaptcha-initializer';

import { RecaptchaInterceptor } from './recaptcha.interceptor';

// Simple test service that will not in the actual app
@Injectable()
export class TestRecaptchaService {
  rootUrl = `http://mockhost`;

  constructor(private readonly http: HttpClient, private readonly config: AppConfigService) {}

  getPosts() {
    return this.http.get<any>(`${this.rootUrl}/posts`);
  }

  getPostsWithCaptcha() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set(this.config.getConfig().recaptcha?.headerName, 'dummy_action');
    return this.http.get<any>(`${this.rootUrl}/posts`, { headers });
  }
}

describe('RecaptchaInterceptor', () => {
  let httpMock: HttpTestingController;
  let testService: TestRecaptchaService;
  let httpRequest: TestRequest;
  let recpatchaService: ReCaptchaV3Service;
  let data: Config;

  data = require('../../../../../../test-assets/mock-config.json');
  const mockConfigService = {
    getConfig: () => data
  };

  beforeEach(() => {
    spyOn(console, 'log');
    TestBed.configureTestingModule({
      providers: [
        { provide: AppConfigService, useValue: mockConfigService },
        TestRecaptchaService,
        RecaptchaInterceptor,
        ReCaptchaV3Service,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RecaptchaInterceptor,
          multi: true
        },
        { provide: RECAPTCHA_V3_SITE_KEY, useFactory: initializeRecaptcha, deps: [AppConfigService] },
      ],
      imports: [
          HttpClientTestingModule
      ]
    });
    testService = TestBed.inject(TestRecaptchaService);
    httpMock = TestBed.inject(HttpTestingController);
    recpatchaService = TestBed.inject(ReCaptchaV3Service);
    data = require('../../../../../../test-assets/mock-config.json');
  });

  it('should be created', () => {
    const interceptor: RecaptchaInterceptor = TestBed.inject(RecaptchaInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('http request without recapcha header defined should not request a captcha token ', () => {
    const recaptchaServiceSpy = spyOn(recpatchaService, 'execute');
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
      expect(recaptchaServiceSpy).not.toHaveBeenCalled();
    });
    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({ response: 'Test response' });

  });

  it('http request with recapcha header defined and not request header should not request a captcha token ', () => {
    data.recaptcha = {
      siteKey: '123',
      headerName: 'recapchaHeader'
    };
    const recaptchaServiceSpy = spyOn(recpatchaService, 'execute');
    testService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
      expect(recaptchaServiceSpy).not.toHaveBeenCalled();
    });
    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({ response: 'Test response' });

  });

  it('http request with recapcha enabled should request a captcha token when captcha header is set ', () => {
    data.recaptcha = {
      siteKey: '123',
      headerName: 'recapchaHeader'
    };
    const recaptchaServiceSpy = spyOn(recpatchaService, 'execute').and.returnValue(of('abcdef'));

    testService.getPostsWithCaptcha().subscribe(response => {
      expect(response).toBeTruthy();
      expect(recaptchaServiceSpy).toHaveBeenCalled();
    });

    httpRequest = httpMock.expectOne(`${testService.rootUrl}/posts`);
    // Devolvemos una respuesta vacía, no nos interesa el contenido
    httpRequest.flush({ response: 'Test response' });

  });
});

import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;
  let httpRequest: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('first time call config cache sould be null', () => {
    service.load().subscribe();

    httpRequest = httpMock.expectOne(`${environment.api.base + environment.api.config}`);
    // Return empty response
    httpRequest.flush({});

    expect().nothing();
  });

  it('second time call config cache sould not be null', () => {
    service.load().subscribe();

    httpRequest = httpMock.expectOne(`${environment.api.base + environment.api.config}`);
    // Return empty response
    httpRequest.flush({});

    service.load().subscribe();

    httpMock.expectOne(`${environment.api.base + environment.api.config}`);

    expect().nothing();
  });

  it('get config should not return null', () => {
    expect(service.getConfig()).not.toBeNull();
  });
});

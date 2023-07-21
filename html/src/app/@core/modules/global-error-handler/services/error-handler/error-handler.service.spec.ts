import { TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { firstValueFrom, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { UndefinedApiError } from '../../model/undefined-api-error';
import { routes } from '../../../../../app-routing.module';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  const mockConfigService: any = jasmine.createSpyObj('ConfigService', ['load', 'getConfig']);
  const ngbModalMock = {
    open: () => ({ componentInstance: {
        title: '',
        buttonLabel: '',
        message : ''
      } }),
    hasOpenModals: () => false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        {provide: NgbModal,  useValue: ngbModalMock },
      ]
    });
    mockConfigService.load.and.returnValue(firstValueFrom(of({})));
    mockConfigService.getConfig.and.returnValue({
      locale: 'es',
      defaultLocale: 'es',
      locales: ['es', 'en'],
      user: {
        name: 'test user'
      },
      api: {
        logout: '/logout'
      }
    });

    service = TestBed.inject(ErrorHandlerService);
    spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call handleError normal error', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(new Error('Error Test'));
    expect(handleErrorSpy).toHaveBeenCalled();
  }));

  it('should call handleError wrapped error', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    const wrapperError = {
      rejection: new Error('Error Test')
    };
    service.handleError(wrapperError);
    expect(handleErrorSpy).toHaveBeenCalled();
  }));

  it('should call handleError HttpErrorResponse 400', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(new HttpErrorResponse({error: {message: 'Hello error'}, status: 400}));
    expect(handleErrorSpy).toHaveBeenCalled();
  }));

  it('should call handleError HttpErrorResponse other than 400', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(new HttpErrorResponse({status: 401}));
    expect(handleErrorSpy).toHaveBeenCalled();
  }));

  it('should call handleError HttpErrorResponse with 403', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(new HttpErrorResponse({status: 403}));
    expect(handleErrorSpy).toHaveBeenCalled();
  }));

  it('should call handleError HttpErrorResponse with 404', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(new HttpErrorResponse({status: 404}));
    expect(handleErrorSpy).toHaveBeenCalled();
  }));

  it('should call handleError UndefinedApiError', waitForAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(new UndefinedApiError());
    expect(handleErrorSpy).toHaveBeenCalled();
  }));
});

import { TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

const ERROR_TOAST = 'error with toast';
const ERROR_TITLE = 'error title';
describe('NotificationService', () => {
  let service: NotificationService;
  let serviceSpy: any;
  let toastrService: ToastrService;

  const translateService: any = jasmine.createSpyObj('TranslateService', ['get']);
  const ngbModalMock = {
    open: () => ({ componentInstance: {
        title: '',
        buttonLabel: '',
        message : ''
      } }),
    hasOpenModals: () => false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        ToastrService,
        { provide: NgbModal,  useValue: ngbModalMock },
        { provide: TranslateService, useValue: translateService }
      ]
    });
    service = TestBed.inject(NotificationService);
    serviceSpy = spyOn(service, 'showModal').and.callThrough();

    toastrService = TestBed.inject(ToastrService);
  }));

  it('should be created', waitForAsync(() => {
    expect(service).toBeTruthy();
  }));

  it('info notification with toast should call toast and not call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    translateService.get.and.returnValue(of({}));

    service.info('info with toast', 'info title', false);

    expect(toastSpy).toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
  }));

  it('info notification with modal should not call toast and call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    service.info('info with modal', 'info title', true);

    expect(toastSpy).not.toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  }));

  it('success notification with toast should call toast and not call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    translateService.get.and.returnValue(of({}));

    service.success('success with toast', 'success title', false);

    expect(toastSpy).toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
  }));

  it('success notification with modal should not call toast and call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    service.success('success with modal', 'success title', true);

    expect(toastSpy).not.toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  }));

  it('error notification with toast should call toast and not call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    translateService.get.and.returnValue(of({}));

    service.error(ERROR_TOAST, ERROR_TITLE, false);

    expect(toastSpy).toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
  }));

  it('error notification with modal should not call toast and call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    service.error('error with modal', ERROR_TITLE, true);

    expect(toastSpy).not.toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  }));

  it('error notification with toast and errors should call toast and not call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    translateService.get.and.returnValue(of({}));

    service.error(ERROR_TOAST, ERROR_TITLE, false, [{ 'i18n.error.key.withParams' : ['the_param']}] );

    expect(toastSpy).toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
  }));

  it('error notification with toast and errors and no params should call toast and not call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    translateService.get.and.returnValue(of({}));

    service.error(ERROR_TOAST, ERROR_TITLE, false, [{ 'i18n.error.key.withParams' : null }] );

    expect(toastSpy).toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
  }));

  it('warning notification with toast should call toast and not call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    translateService.get.and.returnValue(of({}));

    service.warning('warning with toast', 'warning title', false);

    expect(toastSpy).toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
  }));

  it('warning notification with modal should not call toast and call modal', waitForAsync(() => {
    const toastSpy = spyOn(toastrService, 'show');

    service.warning('warning with modal', 'warning title', true);

    expect(toastSpy).not.toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
  }));
});

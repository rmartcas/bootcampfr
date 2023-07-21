import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Config } from '../../@core/common/model/config';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { UndefinedApiError } from '../../@core/modules/global-error-handler/model/undefined-api-error';
import { Audit } from '../model/audit';

import { AuditService } from './audit.service';

describe('AuditService', () => {
  let service: AuditService;

  const data: Config = require('../../../test-assets/mock-config.json');

  const mockConfigService = {
    getConfig: () => data
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuditService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(AuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getServiceUrl should be called', () => {
    const serviceSpy = spyOn(service, 'getServiceUrl').and.callThrough();
    service.find(new Audit()).subscribe().unsubscribe();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('getServiceUrl should launch error when not defined', () => {
    spyOn(service, 'getServiceUrl').and.callFake(() => '');

    try {
      service.find(undefined).subscribe().unsubscribe();
    } catch (error) {
      expect(error).toBeInstanceOf(UndefinedApiError);
    }
  });
});

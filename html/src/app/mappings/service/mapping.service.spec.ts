import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Config } from '../../@core/common/model/config';
import { CrudServiceImpl } from '../../@core/crud/crud-service';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { UndefinedApiError } from '../../@core/modules/global-error-handler/model/undefined-api-error';
import { Mapping } from '../model/mapping';
import { MappingPage } from '../model/mappingPage';

import { MappingService } from './mapping.service';

describe('MappingService', () => {
  let service: MappingService;

  const page: MappingPage = new MappingPage();
  page.currentPage = 1;
  page.size = 10;
  page.totalPages = 1;
  page.totalRecords = 0;
  page.filters = new Mapping();
  const m = new Mapping();
  m.pattern = '/**';
  const m2 = new Mapping();
  m2.pattern = '/api/**';
  const m3 = new Mapping();
  m3.pattern = '/api/mappings';
  page.records = [m, m2, m3];

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
        MappingService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(MappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getServiceUrl should be called', () => {
    spyOn(service, 'getServiceUrl').and.callThrough();
    const searchSpy = spyOn(CrudServiceImpl.prototype, 'search').and.returnValue(of(page));
    service.search(new MappingPage()).subscribe().unsubscribe();
    expect(searchSpy).toHaveBeenCalledTimes(1);
  });

  it('validate should be called', () => {
    const serviceSpy = spyOn(service, 'validate').and.callThrough();
    service.validate().subscribe().unsubscribe();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('validate should launch error when not defined', () => {
    spyOn(service, 'getServiceUrl').and.callFake(() => '');

    try {
      service.validate().subscribe().unsubscribe();
    } catch (error) {
      expect(error).toBeInstanceOf(UndefinedApiError);
    }
  });
});

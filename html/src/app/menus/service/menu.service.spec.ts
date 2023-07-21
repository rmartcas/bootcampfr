import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Config } from '../../@core/common/model/config';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

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
        MenuService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getServiceUrl should be called', () => {
    const serviceSpy = spyOn(service, 'getServiceUrl').and.callThrough();
    service.init().subscribe();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});

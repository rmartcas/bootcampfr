import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { Config } from '../../@core/common/model/config';

describe('ProfileService', () => {
  let service: ProfileService;

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
        ProfileService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(ProfileService);
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

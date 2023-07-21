import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Config } from '../../@core/common/model/config';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

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
        UserService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(UserService);
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

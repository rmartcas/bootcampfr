import { TestBed } from '@angular/core/testing';

import { AuthorityService } from './authority.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { AuthorityPage } from '../model/authorityPage';
import { Authority } from '../model/authority';
import { Config } from '../../@core/common/model/config';

describe('AuthorityService', () => {
  let service: AuthorityService;

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
        AuthorityService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(AuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getServiceUrl should be called for each method', () => {
    const page: AuthorityPage = new AuthorityPage();
    const auth: Authority = new Authority();
    const serviceSpy = spyOn(service, 'getServiceUrl').and.callThrough();
    service.init().subscribe().unsubscribe();
    service.init(page).subscribe().unsubscribe();
    service.initEdit().subscribe().unsubscribe();
    service.initEdit(auth).subscribe().unsubscribe();
    service.insert(undefined).subscribe().unsubscribe();
    service.update(undefined).subscribe().unsubscribe();
    service.delete(undefined).subscribe().unsubscribe();
    service.find(undefined).subscribe().unsubscribe();
    service.search(undefined).subscribe().unsubscribe();
    service.export(undefined).subscribe().unsubscribe();

    expect(serviceSpy).toHaveBeenCalledTimes(10);
  });
});

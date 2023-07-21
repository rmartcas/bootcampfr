import { TestBed } from '@angular/core/testing';

import { initializeRecaptcha } from './recaptcha-initializer';
import { Config } from '../../../common/model/config';
import { AppConfigService } from '../../app-config/app-config.service';

describe('recaptchaInitializer', () => {

  const data: Config = require('../../../../../test-assets/mock-config.json');
  const mockConfigService = {
    getConfig: () => data
  } as AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    spyOn(console, 'log');
  });

  it('should return captcha key when available', () => {
    data.recaptcha = {
      siteKey: '123456',
      headerName: 'recaptchaHeader'
    };
    const key = initializeRecaptcha(mockConfigService);
    expect(key).not.toBeUndefined();
  });

  it('should return undefined when captcha key not available', () => {
    data.recaptcha = undefined;
    const key = initializeRecaptcha(mockConfigService);
    expect(key).toBeUndefined();
  });
});

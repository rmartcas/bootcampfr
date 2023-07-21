import { waitForAsync, TestBed } from '@angular/core/testing';
import { AppConfigService } from '../app-config/app-config.service';
import { initializeApp, httpLoaderFactory } from './app-initializer';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('appInitializer', () => {
  let httpClient: HttpClient;
  const mockConfigService: any = jasmine.createSpyObj('ConfigService', ['load', 'getConfig']);
  let translateService;

  beforeEach(waitForAsync(() => {
    translateService = jasmine.createSpyObj('TranslateService', ['getBrowserLang', 'setDefaultLang',
   'use', 'addLangs', 'defaultLang', 'langs', 'setTranslation']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        { provide: AppConfigService, useValue: mockConfigService },
        TranslateService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
  }));

  it('should resolve the promise', waitForAsync(() => {
    const config = {
      locale: 'es',
      defaultLocale: 'en',
      locales: ['es', 'en'],
      user: {
        name: 'test user'
      },
      api: {
        logout: '/logout'
      }
    };
    mockConfigService.load.and.returnValue(of(config));
    mockConfigService.getConfig.and.returnValue(config);
    translateService.getBrowserLang.and.returnValue('es');
    translateService.langs.includes = (() => true);
    translateService.defaultLang.and.returnValue('es');
    initializeApp(mockConfigService, translateService)().subscribe();

    expect().nothing();
  }));

  it('should resolve the promise with browser lang', waitForAsync(() => {
    const config = {
      locale: 'es',
      defaultLocale: 'es',
      locales: ['es', 'en'],
      user: {
        name: 'test user'
      },
      api: {
        logout: '/logout'
      }
    };
    mockConfigService.load.and.returnValue(of(config));
    mockConfigService.getConfig.and.returnValue(config);
    translateService.getBrowserLang.and.returnValue('es');
    translateService.langs.includes = (() => true);
    translateService.defaultLang.and.returnValue('es');
    initializeApp(mockConfigService, translateService)().subscribe();

    expect().nothing();
  }));

  it('should catch error', waitForAsync(() => {
    mockConfigService.load.and.returnValue(of({}));
    translateService.addLangs.and.throwError(new Error('Test error'));
    translateService.setTranslation.and.stub();
    initializeApp(mockConfigService, translateService)().subscribe();

    expect().nothing();
  }));

  it('should return TranslateHttpLoader', waitForAsync(() => {
    expect(httpLoaderFactory(httpClient)).not.toBe(null);

    expect().nothing();
  }));

});

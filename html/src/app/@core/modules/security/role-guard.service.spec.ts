import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';
import { AppConfigService } from '../app-config/app-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, UrlTree } from '@angular/router';

describe('RoleGuardService', () => {
  let service: RoleGuardService;
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    createUrlTree: () => new UrlTree()
  };
  const mockConfigService = {
    settings: {

      user: {
        name: 'test user',
        authorities: ['ROLE_1', 'ROLE_2']
      },
    },
    getConfig() {
      return this.settings;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: AppConfigService, useValue: mockConfigService },
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(RoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canActivate with null route data roles should return true', () => {
    const routeMock: any = { snapshot: {}, data: {} };
    expect(service.canActivate(routeMock)).toEqual(true);
  });

  it('canActivate with valid route data roles should return true', () => {
    const routeMock: any = { snapshot: {}, data: { roles: ['ROLE_1'] } };
    expect(service.canActivate(routeMock)).toEqual(true);
  });

  it('canActivate with invalid route data roles should not return true', () => {
    const routeMock: any = { snapshot: {}, data: { roles: ['ROLE_INVALID'] } };
    expect(service.canActivate(routeMock)).not.toEqual(true);
  });

  it('canActivateChild with null route data roles should return true', () => {
    const routeMock: any = { snapshot: {}, data: {} };
    expect(service.canActivateChild(routeMock)).toEqual(true);
  });

  it('canActivateChild with valid route data roles should return true', () => {
    const routeMock: any = { snapshot: {}, data: { roles: ['ROLE_1'] } };
    expect(service.canActivateChild(routeMock)).toEqual(true);
  });

  it('canActivateChild with invalid route data roles should not return true', () => {
    const routeMock: any = { snapshot: {}, data: { roles: ['ROLE_INVALID'] } };
    expect(service.canActivateChild(routeMock)).not.toEqual(true);
  });

  it('canLoad with null route data roles should return true', () => {
    const routeMock: any = { snapshot: {}, data: {} };
    expect(service.canLoad(routeMock)).toEqual(true);
  });

  it('canLoad with valid route data roles should return true', () => {
    const routeMock: any = { snapshot: {}, data: { roles: ['ROLE_1'] } };
    expect(service.canLoad(routeMock)).toEqual(true);
  });

  it('canLoad with invalid route data roles should not return true', () => {
    const routeMock: any = { snapshot: {}, data: { roles: ['ROLE_INVALID'] } };
    expect(service.canLoad(routeMock)).not.toEqual(true);
  });
});

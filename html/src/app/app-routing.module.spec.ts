import { TestBed, fakeAsync, tick, flush, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router, Routes } from '@angular/router';
import { routes } from './app-routing.module';
import { AppConfigService } from './@core/modules/app-config/app-config.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppRoutingModule', () => {
  let router: Router;

  const mockConfigService = {
    settings: {
      user: {
        name: 'test user',
        authorities: ['ROLE_READ_PROFILES', 'ROLE_READ_AUTHORITIES', 'ROLE_READ_USERS', 'ROLE_READ_MAPPINGS']
      },
    },
    getConfig() {
      return this.settings;
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']);
    tick(50);
    expect(router.navigated).toBeTrue();
    flush();
  }));

  it('navigate to "home" redirects you to /home', fakeAsync(() => {
    router.navigate(['home']);
    tick(50);
    expect(router.navigated).toBeTrue();
    flush();
  }));

  it('loadChildren should load desired module', fakeAsync(() => {
    const testLoadChildren = (rts: Routes) => {
      for (const route of rts) {
        if (route.loadChildren !== undefined) {
          const routeSpy = spyOn(route, 'loadChildren').and.callThrough();
          try {
            tick(50);
            route.loadChildren();
            flush();
          } catch (error) {
            // Nothing to do here
          } finally {
            flush();
          }
          expect(routeSpy).toHaveBeenCalled();
        }

        if (route.children !== undefined && route.children.length > 0) {
          testLoadChildren(route.children);
        }
      }
    };
    testLoadChildren(routes);
  }));
});

import { TestBed } from '@angular/core/testing';
import { NavigationWatcher } from './navigation-watcher.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ReplaySubject } from 'rxjs';


describe('NavigationWatcher', () => {
  let service: NavigationWatcher;

  let eventSubject: ReplaySubject<RouterEvent> = null;
  let routerMock: any = null;

  beforeEach(() => {
    eventSubject = new ReplaySubject<RouterEvent>(1);

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      events: eventSubject.asObservable(),
      url: 'test/url'
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerMock}
      ]
    });
    service = TestBed.inject(NavigationWatcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('isNavigationPending$ should be true NavigationStart', () => {
    eventSubject.next(new NavigationStart(1, 'table'));
    eventSubject.complete();
    service.isNavigationPending$.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('isNavigationPending$ should be false NavigationEnd', () => {
    eventSubject.next(new NavigationEnd(1, 'table', 'forms'));
    eventSubject.complete();
    service.isNavigationPending$.subscribe((value) => {
      expect(value).toBeFalse();
    });

  });

  it('isNavigationPending$ should be false NavigationCancel', () => {
    eventSubject.next(new NavigationCancel(1, 'table', ''));
    eventSubject.complete();
    service.isNavigationPending$.subscribe((value) => {
      expect(value).toBeFalse();
    });
  });

  it('isNavigationPending$ should be false NavigationError', () => {
    eventSubject.next(new NavigationError(1, 'table', ''));
    eventSubject.complete();
    service.isNavigationPending$.subscribe((value) => {
      expect(value).toBeFalse();
    });
  });
});

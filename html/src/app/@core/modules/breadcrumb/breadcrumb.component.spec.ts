import {Location} from '@angular/common';
import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbComponent } from './breadcrumb.component';

import { Router } from '@angular/router';
import { HomeComponent } from '../../../home/home.component';

const VIEW = '/view/viewParam';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
           { path: 'home', component: HomeComponent, data: { breadcrumb: 'header.home' }},
           { path: 'view/:id', component: HomeComponent, data: { breadcrumb: 'header.view' }},
          ]
        )
      ],
      declarations: [ BreadcrumbComponent ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to "home" breadcrumb add a home breadcrumb', fakeAsync(() => {
    router.navigate(['/home']);
    tick(50);
    expect(component.breadcrumbs.length).toEqual(1);
    expect(location.path()).toBe('/home');
    expect(component.breadcrumbs[0].label).toBe('header.home');
    expect(component.breadcrumbs[0].url).toBe('/home');
  }));

  it('navigate to "view" with id 1 adds a view breadcrumb', fakeAsync(() => {
    router.navigate([VIEW]);
    tick(50);
    expect(component.breadcrumbs.length).toEqual(1);
    expect(location.path()).toBe(VIEW);
    expect(component.breadcrumbs[0].label).toBe('viewParam');
    expect(component.breadcrumbs[0].url).toBe(VIEW);
  }));
});

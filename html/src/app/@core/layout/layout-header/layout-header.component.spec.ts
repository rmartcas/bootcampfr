import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LayoutHeaderComponent} from './layout-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppConfigService} from '../../modules/app-config/app-config.service';
import {Component, Input} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';

@Component({
  selector: 'app-layout-menu',
  template: '<p>Mock Product Settings Component</p>'
})
class MockLayoutMenuComponent {
  @Input() isMenuCollapsed = true;
}

@Component({
  selector: 'app-breadcrumb',
  template: '<p>Mock Product Settings Component</p>'
})
class MockBreadcrumbComponent {
}

describe('LayoutHeaderComponent', () => {
  let component: LayoutHeaderComponent;
  let fixture: ComponentFixture<LayoutHeaderComponent>;
  let translateService: TranslateService;

  const mockConfigService = {
    settings: {
      locale: 'es',
      defaultLocale: 'es',
      locales: ['es', 'en'],
      user: {
        name: 'test user'
      },
      api: {
        logout: '/logout'
      }
    },
    getConfig() {
      return this.settings;
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutHeaderComponent,
        MockBreadcrumbComponent,
        MockLayoutMenuComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        { provide: AppConfigService, useValue: mockConfigService },
      ]
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('use language should change translate language', () => {
    const translateSpy = spyOn(translateService, 'use');
    component.useLanguage('en');

    expect(translateSpy).toHaveBeenCalled();
  });
});

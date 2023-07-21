import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutMenuComponent } from './layout-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfigService } from '../../../modules/app-config/app-config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('LayoutMenuComponent', () => {
  let component: LayoutMenuComponent;
  let fixture: ComponentFixture<LayoutMenuComponent>;
  const mockConfigService: any = jasmine.createSpyObj('ConfigService', ['load', 'getConfig'], { cache$: of({ menus: []})});
  mockConfigService.getConfig.and.returnValue({
    locale: 'es',
    defaultLocale: 'es',
    locales: ['es', 'en'],
    user: {
      name: 'test user'
    },
    api: {
      logout: '/logout',
      core: {
        menu: 'url_to_menu'
      }
    }
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMenuComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

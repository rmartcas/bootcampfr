import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from '../../../../modules/app-config/app-config.service';

import { MenuFolderComponent } from './menu-folder.component';

describe('MenuFolderComponent', () => {
  let component: MenuFolderComponent;
  let fixture: ComponentFixture<MenuFolderComponent>;

  const mockConfigService: any = jasmine.createSpyObj('ConfigService', ['load', 'getConfig']);
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFolderComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { delay, of } from 'rxjs';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { Menu } from '../../model/menu';
import { MenuService } from '../../service/menu.service';

import { MenuEditComponent } from './menu-edit.component';

describe('MenuEditComponent', () => {
  let component: MenuEditComponent;
  let fixture: ComponentFixture<MenuEditComponent>;

  const mockService: any = jasmine.createSpyObj('MenuService', ['search', 'delete', 'find', 'initEdit']);
  mockService.initEdit.and.returnValue(of({ authorities: [{key: 1, value: 'x'}], parents: [{key: 1, value: 'x'}]}).pipe(delay(1)));

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEditComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        NgbActiveModal,
        { provide: MenuService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEditComponent);
    component = fixture.componentInstance;
    component.model = new Menu();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

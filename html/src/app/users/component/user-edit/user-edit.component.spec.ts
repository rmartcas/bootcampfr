import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  const mockService = {
    id: 1,
    username: 'username',
    name: 'user',
    email: 'user@test.xx',
    initEdit: (() => of( { profiles: [{key: 1, value: 'x'}]}))
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        NgbActiveModal,
        { provide: UserService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    component.model = new User();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

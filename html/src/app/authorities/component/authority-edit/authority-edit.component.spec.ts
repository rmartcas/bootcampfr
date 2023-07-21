import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { Authority } from '../../model/authority';
import { AuthorityService } from '../../service/authority.service';

import { AuthorityEditComponent } from './authority-edit.component';

describe('AuthorityEditComponent', () => {
  let component: AuthorityEditComponent;
  let fixture: ComponentFixture<AuthorityEditComponent>;

  const mockAuthorityService = {
    id: 1,
    name: 'ROLE_ADMIN',
    description: 'Role for admin purposes',
    initEdit: (() => of({ profiles: [{key: 1, value: 'x'}]}))
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
      declarations: [ AuthorityEditComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        NgbActiveModal,
        { provide: AuthorityService, useValue: mockAuthorityService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityEditComponent);
    component = fixture.componentInstance;
    component.model = new Authority();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

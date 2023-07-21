import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { Mapping } from '../../model/mapping';
import { MappingService } from '../../service/mapping.service';

import { MappingEditComponent } from './mapping-edit.component';

describe('MappingEditComponent', () => {
  let component: MappingEditComponent;
  let fixture: ComponentFixture<MappingEditComponent>;

  const mockService: any = jasmine.createSpyObj('MappingService', ['search', 'delete', 'find', 'initEdit']);
  mockService.initEdit.and.returnValue(of({ authorities: [{key: 1, value: 'x'}], mappings: [{key: 1, value: 'x'}]}).pipe(delay(1)));

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
      declarations: [ MappingEditComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        NgbActiveModal,
        { provide: MappingService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingEditComponent);
    component = fixture.componentInstance;
    component.model = new Mapping();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

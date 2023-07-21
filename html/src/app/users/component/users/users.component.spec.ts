import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { User } from '../../model/user';
import { UserPage } from '../../model/userPage';
import { UserService } from '../../service/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

import { UsersComponent } from './users.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const model = new User();

  const page: UserPage = new UserPage();
  page.currentPage = 1;
  page.size = 10;
  page.totalPages = 1;
  page.totalRecords = 0;
  page.filters = new User();

  const mockService: any = jasmine.createSpyObj('UserService', ['search', 'delete', 'find', 'init', 'initEdit', 'insert', 'update']);
  mockService.search.and.returnValue(of(page).pipe(delay(1)));
  mockService.delete.and.returnValue(of(model).pipe(delay(1)));
  mockService.find.and.returnValue(of(model).pipe(delay(1)));
  mockService.insert.and.returnValue(of(model).pipe(delay(1)));
  mockService.update.and.returnValue(of(model).pipe(delay(1)));
  mockService.init.and.returnValue(of({ profiles: [{key: 1, value: 'x'}]}).pipe(delay(1)));
  mockService.initEdit.and.returnValue(of({ profiles: [{key: 1, value: 'x'}]}).pipe(delay(1)));

  const mockConfigService = {
    settings: {
      user: {
        name: 'test user',
        authorities: ['ROLE_READ_USERS', 'ROLE_WRITE_USERS']
      },
      pagination: {
        size: 10,
        page: 1,
        pageLimits: [5,10,50, -1]
      }
    },
    getConfig() {
      return this.settings;
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent, UserEditComponent ],
      imports: [
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: UserService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit record', fakeAsync(() => {
    component.ngOnInit();
    tick(2);
    expect(mockService.init).toHaveBeenCalled();
    expect(mockService.search).toHaveBeenCalled();
  }));

  it('submit valid Filter forms', fakeAsync(() => {
    component.onSearch();
    tick(500);
    expect(component.page.totalRecords).toEqual(0);
  }));

  it('submit invalid Filter forms', () => {
    // Update the Description filter
    component.form.controls.name.setValue('alksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasl' +
    'dkjslkdjlaskdjalskjdalksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasldkjslkdjlaskdjalskjdal' +
    'ksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasldkjslkdjlaskdjalskjdalksjdalksjdalskdjaslkdjasl' +
    'dkajskldjasdkjaslkdjasldkjslkdjlaskdjalskjd');
    component.onSearch();
    expect(component.form.invalid).toBeTruthy();
  });

  it('onNew record', fakeAsync(() => {
    const dto = null;
    const modal = component.onNew(dto);
    modal.componentInstance.ngOnInit();
    tick(500);
    expect(mockService.initEdit).toHaveBeenCalled();
    modal.componentInstance.form.controls.username.setValue('aasd');
    modal.componentInstance.form.controls.name.setValue('testUser');
    modal.componentInstance.form.controls.email.setValue('testUser@test.com');
    modal.componentInstance.form.controls.profile.setValue({ id: 1, name: 'x'});
    modal.componentInstance.onSubmit();
    tick(500);
    expect(mockService.insert).toHaveBeenCalled();
    flush();
  }));

  it('onEdit null record selected', () => {
    const dto = null;
    const modal = component.onEdit(dto);
    expect(modal).toBeNull();
  });


  it('onEdit one record selected', fakeAsync(() => {
    const dto = new User();
    dto.id = 1;
    dto.name = 'test user';
    dto.username = 'username';
    dto.email = 'testUser@test.com';
    dto.profile = { id: 1, name: 'x'};

    component.onEdit(dto);
    tick(500);
    expect(mockService.find).toHaveBeenCalled();
    const modal = component.getModalRef();
    modal.componentInstance.ngOnInit();
    tick(500);
    expect(mockService.initEdit).toHaveBeenCalled();
    modal.componentInstance.form.controls.name.setValue('modified test user');
    modal.componentInstance.form.controls.profile.setValue({ id: 1, name: 'x'});
    modal.componentInstance.onSubmit();
    tick(500);
    expect(mockService.update).toHaveBeenCalled();
    flush();
  }));

  it('onDelete no records selected', () => {
    const modal = component.onDelete(null);
    expect(modal).toBeNull();
  });

  it('onDelete record selected and cancel modal no record is deleted', fakeAsync(() => {
    const dto = new User();
    dto.id = 1;
    const modal = component.onDelete(dto);
    tick(500);
    modal.close(false);
    tick(500);
    const m = TestBed.inject(NgbModal);
    expect(m.hasOpenModals()).toBeFalse();
    flush();
  }));

  it('onDelete record selected and accept modal record is deleted', fakeAsync(() => {
    const dto = new User();
    dto.id = 1;
    component.getPage().records = [dto];
    const modal = component.onDelete(dto);
    tick(500);
    modal.close(true);
    tick(500);
    expect(mockService.delete).toHaveBeenCalled();
    expect(mockService.search).toHaveBeenCalled();
    flush();
  }));
});

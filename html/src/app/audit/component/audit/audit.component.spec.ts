import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { Audit } from '../../model/audit';
import { AuditPage } from '../../model/auditPage';
import { AuditService } from '../../service/audit.service';
import { AuditViewComponent } from '../audit-view/audit-view.component';

import { AuditComponent } from './audit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AuditComponent', () => {
  let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;

  const model = new Audit();
  const page: AuditPage = new AuditPage();
  page.currentPage = 1;
  page.size = 10;
  page.totalPages = 1;
  page.totalRecords = 0;
  page.filters = new Audit();

  const mockService: any = jasmine.createSpyObj('AuditService', ['search', 'find', 'init', 'initEdit']);
  mockService.search.and.returnValue(of(page).pipe(delay(1)));
  mockService.find.and.returnValue(of(model).pipe(delay(1)));
  mockService.init.and.returnValue(of({
    tables: [{key: 1, value: 'x'}],
    actions: [{key: 1, value: 'x'}],
    buttons: [{ name: 'edit', icon: 'pen', handler: 'onEdit' }, { name: 'new', icon: 'plus', handler: 'onNew' }],
    columns: [{ propertyOrder: 'filters.description' }]
  }).pipe(delay(1)));
  mockService.initEdit.and.returnValue(of({
    authorities: [{key: 1, value: 'x'}],
    mappings: [{key: 1, value: 'x'}],
    buttons: [{ name: 'edit', icon: 'pen', handler: 'onEdit' }, { name: 'new', icon: 'plus', handler: 'onNew' }],
    columns: [{ propertyOrder: 'filters.description' }]
  }).pipe(delay(1)));

  const mockConfigService = {
    settings: {
      user: {
        name: 'test user',
        authorities: ['ROLE_1', 'ROLE_2']
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
      declarations: [ AuditComponent, AuditViewComponent ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuditService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditComponent);
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
  }));

  it('submit valid Filter forms', fakeAsync(() => {
    component.form.controls.table.setValue({name: 'XXXXX_TABLE'});
    component.onSearch();
    tick(500);
    expect(component.page.totalRecords).toEqual(0);
  }));

  it('onEdit null record selected', () => {
    const dto = null;
    const modal = component.onEdit(dto);
    expect(modal).toBeNull();
  });

  it('onEdit one record selected', fakeAsync(() => {
    const dto = new Audit();
    dto.id = 1;
    dto.pairKey = '123';
    dto.table = 'XXXX_TABLE';

    component.onEdit(dto);
    tick(500);
    expect(mockService.find).toHaveBeenCalled();
    const modal = component.getModalRef();
    modal.componentInstance.ngOnInit();
    tick(500);
    modal.close(true);
    tick(500);
    flush();
  }));

  it('getButtons ', fakeAsync(() => {
    component.ngOnInit();
    tick(2);
    const buttons = component.getButtons();
    expect(buttons).not.toBeNull();
    expect(buttons.length).toEqual(2);
    buttons.forEach(button => {
      expect(button.icon).not.toBeNull();
    });
    flush();
  }));

  it('getColumnModel ', fakeAsync(() => {
    component.ngOnInit();
    tick(2);
    const columnModel = component.getColumnModel();
    expect(columnModel).not.toBeNull();
    expect(columnModel.length).toEqual(1);
    flush();
  }));
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { Mapping } from '../../model/mapping';
import { MappingPage } from '../../model/mappingPage';
import { MappingService } from '../../service/mapping.service';
import { MappingEditComponent } from '../mapping-edit/mapping-edit.component';
import { MappingValidateComponent } from '../mapping-validate/mapping-validate.component';

import { MappingsComponent } from './mappings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MappingsComponent', () => {
  let component: MappingsComponent;
  let fixture: ComponentFixture<MappingsComponent>;

  const model = new Mapping();
  const page: MappingPage = new MappingPage();
  page.currentPage = 1;
  page.size = 10;
  page.totalPages = 1;
  page.totalRecords = 0;
  page.filters = new Mapping();

  const mockService: any = jasmine.createSpyObj('MappingService', ['search', 'delete', 'find',
   'init', 'initEdit', 'insert', 'update', 'validate']);
  mockService.search.and.returnValue(of(page).pipe(delay(1)));
  mockService.delete.and.returnValue(of(model).pipe(delay(1)));
  mockService.find.and.returnValue(of(model).pipe(delay(1)));
  mockService.insert.and.returnValue(of(model).pipe(delay(1)));
  mockService.update.and.returnValue(of(model).pipe(delay(1)));
  mockService.init.and.returnValue(of({
    authorities: [{key: 1, value: 'x'}],
    mappings: [{key: 1, value: 'x'}],
    buttons: [{ name: 'edit', icon: 'pen', handler: 'onEdit' }, { name: 'new', icon: 'plus', handler: 'onNew' }],
    columns: [{ propertyOrder: 'filters.description' }]
  }).pipe(delay(1)));
  mockService.initEdit.and.returnValue(of({
    authorities: [{key: 1, value: 'x'}],
    mappings: [{key: 1, value: 'x'}],
    buttons: [{ name: 'edit', icon: 'pen', handler: 'onEdit' }, { name: 'new', icon: 'plus', handler: 'onNew' }],
    columns: [{ propertyOrder: 'filters.description' }]
  }).pipe(delay(1)));
  mockService.validate.and.returnValue(of({'/': ['Administrador']}).pipe(delay(1)));

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
      declarations: [ MappingsComponent, MappingEditComponent, MappingValidateComponent ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MappingService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingsComponent);
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
    component.form.controls.position.setValue('alksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasldkjslkdjlask' +
    'djalskjdalksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasldkjslkdjlaskdjalskjdalksjdalksjdalskdjaslkdjas' +
    'ldkajskldjasdkjaslkdjasldkjslkdjlaskdjalskjdalksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasldkjslkdjlaskdjalskjd');
    component.onSearch();
    expect(component.form.invalid).toBeTruthy();
  });

  it('onNew record', fakeAsync(() => {
    const dto = null;
    const modal = component.onNew(dto);
    modal.componentInstance.ngOnInit();
    tick(500);
    expect(mockService.initEdit).toHaveBeenCalled();
    modal.componentInstance.form.controls.pattern.setValue('aasd');
    modal.componentInstance.form.controls.position.setValue('1');
    modal.componentInstance.form.controls.authorities.setValue([{ id: 1, name: 'x'}]);
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
    const dto = new Mapping();
    dto.id = 1;
    dto.pattern = 'test pattern';
    dto.position = 99;
    dto.authorities = [{ id: 1, name: 'x'}];

    component.onEdit(dto);
    tick(500);
    expect(mockService.find).toHaveBeenCalled();
    const modal = component.getModalRef();
    modal.componentInstance.ngOnInit();
    tick(500);
    expect(mockService.initEdit).toHaveBeenCalled();
    modal.componentInstance.form.controls.pattern.setValue('modified pattern');
    modal.componentInstance.form.controls.position.setValue('98');
    modal.componentInstance.form.controls.authorities.setValue([{ id: 1, name: 'x'}]);
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
    const dto = new Mapping();
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
    const dto = new Mapping();
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

  it('onValidate mappings', fakeAsync(() => {
    const modal = component.onValidate();
    tick(500);
    modal.close(true);
    tick(500);
    expect(mockService.validate).toHaveBeenCalled();
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

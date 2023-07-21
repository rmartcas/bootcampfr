import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { delay, of } from 'rxjs';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { SharedModule } from '../../../shared/shared.module';
import { Menu } from '../../model/menu';
import { MenuPage } from '../../model/menuPage';
import { MenuService } from '../../service/menu.service';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';

import { MenusComponent } from './menus.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;

  const model = new Menu();
  const page: MenuPage = new MenuPage();
  page.currentPage = 1;
  page.size = 10;
  page.totalPages = 1;
  page.totalRecords = 0;
  page.filters = new Menu();

  const mockService: any = jasmine.createSpyObj('MenuService', ['search', 'delete', 'find',
   'init', 'initEdit', 'insert', 'update']);
  mockService.search.and.returnValue(of(page).pipe(delay(1)));
  mockService.delete.and.returnValue(of(model).pipe(delay(1)));
  mockService.find.and.returnValue(of(model).pipe(delay(1)));
  mockService.insert.and.returnValue(of(model).pipe(delay(1)));
  mockService.update.and.returnValue(of(model).pipe(delay(1)));
  mockService.init.and.returnValue(of({
    authorities: [{key: 1, value: 'x'}],
    buttons: [{ name: 'edit', icon: 'pen', handler: 'onEdit' }, { name: 'new', icon: 'plus', handler: 'onNew' }],
    columns: [{ propertyOrder: 'filters.description' }]
  }).pipe(delay(1)));
  mockService.initEdit.and.returnValue(of({
    authorities: [{key: 1, value: 'x'}],
    parents: [{key: 1, value: 'x'}],
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusComponent, MenuEditComponent ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MenuService, useValue: mockService },
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusComponent);
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
    component.form.controls.title.setValue('alksjdalksjdalskdjaslkdjasldkajskldjasdkjaslkdjasldkjslkdjlask' +
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
    modal.componentInstance.form.controls.title.setValue('aasd');
    modal.componentInstance.form.controls.link.setValue('1');
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
    const dto = new Menu();
    dto.id = 1;
    dto.title = 'test pattern';
    dto.position = 99;
    dto.authorities = [{ id: 1, name: 'x'}];

    component.onEdit(dto);
    tick(500);
    expect(mockService.find).toHaveBeenCalled();
    const modal = component.getModalRef();
    modal.componentInstance.ngOnInit();
    tick(500);
    expect(mockService.initEdit).toHaveBeenCalled();
    modal.componentInstance.form.controls.title.setValue('modified pattern');
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
    const dto = new Menu();
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
    const dto = new Menu();
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

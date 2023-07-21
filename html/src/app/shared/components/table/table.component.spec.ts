import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { NotificationService } from '../../../@core/modules/notification/notification.service';
import { Page } from '../../../@core/common/model/page';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared.module';
import { Observable } from 'rxjs';


describe('TableComponent', () => {

  @Component({
    selector: `app-host-component`,
    template: `<app-table #table [page]="page"
                          [columns]="[
                            {prop: 'column1', name: 'col1', propertyOrder: 'filters.prop1'},
                            {prop: 'column2', name: 'col2', propertyOrder: 'filters.prop2'}]"
                            [treeFromRelation]="'column1'"
                            [treeToRelation]="'column2'"
                            [pageChanged]="getPageChanged()"
                ></app-table>`
  })
  class TestHostComponent {

    @ViewChild(TableComponent) table: TableComponent;

    page: Page<any> = new Page<any>();

    private readonly pageChanged: EventEmitter<Page<any>> = new EventEmitter<Page<any>>();

    constructor() {
      this.page.size = 10;
      this.page.currentPage = 1;
      this.page.records = [{ id: 99, column1: 1, column2: 2}];
    }

    getPageChanged(): Observable<Page<any>> {
      return this.pageChanged.asObservable();
    }
  }

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

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
      declarations: [ TableComponent, TestHostComponent ],
      imports: [
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        NgxDatatableModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        NotificationService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    })
    .compileComponents();

    spyOn(console, 'log');
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('getId should return rowId', () => {
    const func = testHostComponent.table.getRowId();
    expect(func(testHostComponent.page.records[0])).toBe(99);
  });

  it('onPageChange page should return offset + 1', () => {
    const subs = testHostComponent.table.changed.subscribe(page => {
      expect(page.currentPage).toBe(3);
    });
    testHostComponent.table.onPageChange({ offset: 2});
    subs.unsubscribe();
  });

  it('onSelect record add to selected', () => {
    const subs = testHostComponent.table.selectRecord.subscribe(selected => {
      expect(selected.length).toBe(1);
    });
    testHostComponent.table.onSelect({ selected: [{ id: 99, column1: 1, column2: 2}, { id: 98, column1: 11, column2: 22}]});
    subs.unsubscribe();
  });

  it('onSelect record add to selected without override', () => {
    testHostComponent.table.overrideSelected = false;
    const subs = testHostComponent.table.selectRecord.subscribe(selected => {
      expect(selected.length).toBe(2);
    });
    testHostComponent.table.onSelect({ selected: [{ id: 99, column1: 1, column2: 2}, { id: 98, column1: 11, column2: 22}]});
    subs.unsubscribe();
  });

  it('toggle column visibility checked', () => {
    const event = {
      preventDefault: () => { console.log('preventDefault'); }
    };
    const col =  testHostComponent.table.toggleColumns[0];
    testHostComponent.table.toggle(event, col);
    expect(testHostComponent.table.columns.includes(col)).toBeFalse();
  });

  it('toggle column cannot hide all columns', () => {
    const event = {
      preventDefault: () => { console.log('preventDefault'); }
    };
    const col =  testHostComponent.table.toggleColumns[0];
    testHostComponent.table.columns = [col];
    testHostComponent.table.toggle(event, col);
    expect(testHostComponent.table.columns.includes(col)).toBeTrue();
  });

  it('toggle column check', () => {
    const event = {
      preventDefault: () => { console.log('preventDefault'); }
    };
    const col =  testHostComponent.table.toggleColumns[0];
    testHostComponent.table.columns = [];
    testHostComponent.table.toggle(event, col);
    expect(testHostComponent.table.columns.includes(col)).toBeTrue();
  });

  it('onLimitChange update page limit is emmited', () => {
    testHostComponent.page.size = 1;
    testHostComponent.table.changed.subscribe(page => {
      expect(page.size).toEqual(1);
    });
    testHostComponent.table.onLimitChange();
  });

  it('when no sort order pageorders is empty', () => {
    testHostComponent.table.changed.subscribe(page => {
      expect(page.pageOrder).toEqual([]);
    });

    const header = {
      sorts: []
    };
    testHostComponent.table.onSortChange(header);
  });

  it('when sort change pageOrders is updated with new sorting orders', () => {
    testHostComponent.table.changed.subscribe(page => {
      expect(page.pageOrder[0]).toEqual({
        property: 'filters.prop1',
        order: 'ASC'
      });
    });

    const header = {
      sorts: [{
        prop: 'column1',
        dir: 'asc'
      }]
    };
    testHostComponent.table.onSortChange(header);
  });

  it('test for tableComponent.onClick', () => {

    const event = {
      isTrusted: true
    };
    testHostComponent.table.onClick(event);

    expect(testHostComponent.table.onClick).toBeDefined();
  });

  it('test for tableComponent.isClickInBodyTable', () => {
    const event = {
      srcElement: null
    };
    const ret = testHostComponent.table.isClickInBodyTable(event);

    expect(ret).toBeFalse();
  });

  it('test for tableComponent.isClickInBodyTable checkbox', () => {
    const event = {
      srcElement: {
        className: 'ngx-datatable',
        type: 'checkbox'
      }
    };
    const ret = testHostComponent.table.isClickInBodyTable(event);

    expect(ret).toBeFalse();
  });

  it('test for tableComponent.isClickInBodyTable body', () => {
    const event = {
      srcElement: {
        className: 'body',
        type: 'input'
      }
    };
    const ret = testHostComponent.table.isClickInBodyTable(event);

    expect(ret).toBeTrue();
  });

  it('test for tableComponent.isClickInBodyTable parent', () => {
    const event = {
      srcElement: {
        className: '',
        type: 'input',
        parentElement: null
      }
    };
    const ret = testHostComponent.table.isClickInBodyTable(event);

    expect(ret).toBeFalse();
  });

  it('onTreeAction treeStatus undefined should be assigned to disabled', () => {
    const event = {
      row: {
        treeStatus: undefined
      }
    };
    testHostComponent.table.onTreeAction(event);
    expect(event.row.treeStatus).toBeDefined();
    expect(event.row.treeStatus).toEqual('disabled');
  });

  it('onTreeAction treeStatus collapsed should be assigned to disabled', () => {
    const event = {
      row: {
        treeStatus: 'collapsed'
      }
    };
    testHostComponent.table.onTreeAction(event);
    expect(event.row.treeStatus).toBeDefined();
    expect(event.row.treeStatus).toEqual('disabled');
  });

  it('onTreeAction treeStatus expanded should be assigned to collapsed', () => {
    const event = {
      row: {
        treeStatus: 'expanded'
      }
    };
    testHostComponent.table.onTreeAction(event);
    expect(event.row.treeStatus).toBeDefined();
    expect(event.row.treeStatus).toEqual('collapsed');
  });
});

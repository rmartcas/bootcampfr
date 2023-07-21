import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ColumnMode, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { AppTableColumn } from './table-column.model';
import { TableButton } from './table-button.model';
import { Page } from '../../../@core/common/model/page';
import { PageOrder } from '../../../@core/common/model/pageOrder';
import { NotificationService } from '../../../@core/modules/notification/notification.service';
import { EnabledOn } from './enabled-on';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table[page]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  // The page with settings and records for the table
  @Input() page: Page<any>;

  // Table column model
  @Input() columns: AppTableColumn[] = [];

  // Table buttons to manipulate the data
  @Input() buttons: TableButton[] = [];

  /** The column id to uniquely identifying a record */
  @Input() columnId = 'id';

  /** The column property to create a tree table using parent ref (ej: manager)*/
  @Input() treeFromRelation?: string;

  /** The column property to create a tree table using child ref (ej: name)*/
  @Input() treeToRelation?: string;

  /**
   * When true, the selected records in current page will be overriden if the page
   *  changes and any other record is selected from the new current page. Default true.
   */
  @Input() overrideSelected = true;

  /** List of selected rows in table */
  @Input() selected: any[] = [];

  /** The table is sorted in backend? */
  @Input() externalSorting = true;

  /** The table is paginated in backend? */
  @Input() externalPaging = true;

  /** Has the table a checkboxable column for each row? */
  @Input() headerCheckboxable = false;

  /** A observable that will notify when a page records are changed */
  @Input() pageChanged: Observable<Page<any>>;

  // Emmit events on any change made in the table (sort (if page size <> -1), page change (if page size <> -1), page size...)
  @Output() changed: EventEmitter<Page<any>> = new EventEmitter<Page<any>>();

  @Output() selectRecord: EventEmitter<any> = new EventEmitter<any>();

  // The column mode for the table
  columnMode = ColumnMode;

  /** Selection type. Multiple */
  selectionType = SelectionType;

  /** Sort type. Multiple */
  sortType = SortType;

  /** Buttons enabled on conditions. */
  enabledOn = EnabledOn;

  // Copy of column for toggle column
  toggleColumns: AppTableColumn[] = [];

  /** The initial status of records for tree table */
  isCollapsedStatus = true;

  protected destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly notifier: NotificationService, readonly config: AppConfigService) { }

  ngOnInit(): void {
    Object.assign(this.toggleColumns, this.columns);
    this.columns = this.columns.filter(c => undefined === c.hidden || c.hidden === false);
    this.pageChanged?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateRecordsCollapseStatus();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getRowId() {
    return this.getId.bind(this);
  }

  getRowButtons(): TableButton[] {
    return this.buttons.filter(b => b.rowButton);
  }

  getTopButtons(): TableButton[] {
    return this.buttons.filter(b => !b.rowButton);
  }

  /**
   * Populate the table with new data based on the requested page number
   *
   * @param pageInfo The page to select
   */
  onPageChange(pageInfo: any) {
    this.page.currentPage = pageInfo.offset + 1;
    if (this.page.size > -1) {
      this.emitChange(this.page);
    }
  }

  /**
   * Event is fired when "page.size" is changed
   */
  onLimitChange() {
    this.emitChange(this.page);
  }

  /**
   * Populate the table with new data based on the page sort
   *
   * @param header The column with new sort order
   */
  onSortChange(header: any) {
    const sortOrders: PageOrder[] = [];
    header.sorts.forEach((sort: { prop: any; dir: string }) => {
      const column = this.columns.find(c => (c.prop === sort.prop));
      sortOrders.push({ property: column.propertyOrder || column.prop.toString(), order: sort.dir.toUpperCase()});
    });

    this.page.pageOrder = sortOrders;
    this.emitChange(this.page);
  }

  onSelect(selectedRow: any) {
    if (this.overrideSelected) {
      this.selected = selectedRow.selected.filter(
        (record: any) => this.page.records.find(
          (r: any) => r[this.columnId] === record[this.columnId]) !== undefined, this);
    } else {
      this.selected = selectedRow.selected;
    }
    this.selectRecord.emit(this.selected);
  }

  /**
   * Callback function used after any any button is clicked.
   * The callback is provided as third argument in button handler.
   * Use this callback is optional. Must be explicity called in button handler.
   */
  afterClick() {
    return this.afterClickCallback.bind(this);
  }

  /**
   * Shows or hides a table column
   *
   * @param event Click event on column toogle dropdown
   * @param col The column to show or hide
   */
  toggle(event: any, col: any) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      if (this.columns.length > 1) {
        this.columns = this.columns.filter(c => c.prop !== col.prop);
      }
      else {
        // At least one column must be visible
        this.notifier.warning('i18n.validation.record.one.required');
        event.preventDefault();
      }
    } else {
      const index = this.findIndex(col);
      this.columns.splice(index, 0, col);
      this.columns = [...this.columns];
    }
  }

  /**
   * Checks if the column is hidden
   *
   * @param col The column to check
   */
  isChecked(col: any) {
    return (
      this.columns.find(c => (c.prop === col.prop)) !== undefined
    );
  }

  onClick(event: any) {
    if (this.headerCheckboxable && this.isClickInBodyTable(event)) {
      const checkbox = this.getCheckbox(event);
      if (null != checkbox) {
        checkbox.dispatchEvent(new Event('click'));
      }
    }
  }

  isClickInBodyTable(event: any) {
    const t = event.srcElement || event.target;
    return this.getClassBodyElement(t);
  }

  getClassBodyElement(element: any) {
    if (null == element) {
      return false;
    }
    const className = element.className;
    if (element.type === 'checkbox' || className.indexOf('ngx-datatable') !== -1) {
      return false;
    }
    else if (className.indexOf('body') !== -1) {
      return true;
    }
    else {
      return this.getClassBodyElement(element.parentElement);
    }
  }

  getCheckbox(event: any) {
    const t = event.srcElement || event.target;
    return this.getElementCheckbox(t);
  }

  getElementCheckbox(parent: any) {
    const className = parent.className;
    const checkbox = parent.querySelector('[type="checkbox"]');
    if (className.indexOf('ngx-datatable') === -1) {
      if (checkbox) {
        return checkbox;
      }
      else {
        return this.getElementCheckbox(parent.parentElement);
      }
    }
    else {
      return null;
    }
  }

  onTreeAction(event: any) {
    const row = event.row;
    if (row.treeStatus === undefined || row.treeStatus === 'collapsed') {
      row.treeStatus = this.hasChildren(row) ? 'expanded' : 'disabled';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.page.records = [...this.page.records];
  }

  toggleCollapse() {
    this.isCollapsedStatus = !this.isCollapsedStatus;
    this.updateRecordsCollapseStatus();
  }

  private emitChange(page: Page<any>) {
    this.changed.emit(page);
  }

  private updateRecordsCollapseStatus() {
    this.page.records.forEach(record => {
      if (this.isCollapsedStatus) {
        // Colapsar
        record.treeStatus = 'collapsed';
      } else {
        // Expandir
        record.treeStatus = this.hasChildren(record) ? 'expanded' : 'disabled';
      }
    });
    this.page.records = [...this.page.records];
  }

  private hasChildren(row: any): boolean {
    const getNestedPath = (target, path) => path.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, target);

    const parentId = getNestedPath(row, this.treeToRelation.split('.'));
    const childs = this.page.records.find(child => {
      const myParentId = getNestedPath(child, this.treeFromRelation.split('.'));
      return myParentId !== undefined && myParentId === parentId;
    });

    return childs !== undefined;
  }

  private afterClickCallback() {
    this.onSelect({ selected: this.selected });
  }

  private getId(row: any) {
    return row[this.columnId];
  }

  private findIndex(col: any) {
    let index = this.toggleColumns.indexOf(col);
    this.columns.forEach((column, idx) => {
      const colIndex = this.toggleColumns.indexOf(column);
      if (index <= colIndex) {
        index = index <= idx ? index : idx;
      } else {
        index = index <= idx ? idx : index;
      }
    });
    return index;
  }
}


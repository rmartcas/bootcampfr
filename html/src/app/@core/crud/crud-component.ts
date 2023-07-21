import { EventEmitter, Injector, OnDestroy, Output, Type, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { TableButton } from '../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../shared/components/table/table-column.model';
import { FileDownloadService } from '../../shared/service/file-download/file-download.service';
import { Core } from '../common/model/core';
import { DataLoad } from '../common/model/dataLoad';
import { Page } from '../common/model/page';
import { ModalButton } from '../modules/modal/model/modal-button.model';
import { NotificationService } from '../modules/notification/notification.service';
import { CrudService } from './crud-service';

const MODAL_TITLE = 'modal-title';

export interface CrudComponent<T extends Core<any>> {

    /**
     * @description Get the associated service of this component
     * @returns CrudService
     */
    getService(): CrudService<T>;

    /**
     * @description Get the component used to create or edit a record in this component
     * @returns CrudEditComponent
     */
    getModalComponent(): Type<CrudEditComponent<T>>;

    /**
     * @description Get the modal component default config to use.
     * @returns NgbModalOptions
     */
    getModalConfig(): NgbModalOptions;

    /**
     * @description Get the page used in searchs for this component
     * @returns Page
     */
    getPage(): Page<T>;

    /**
     * @description Get the table buttons used in this component
     * @returns array of TableButton
     */
    getButtons(): TableButton[];

    /**
     * @description Get the table columns used in this component
     * @returns array of AppTableColumn
     */
    getColumnModel(): AppTableColumn[];

    /**
     * @description Get the form used in search filters
     * @returns FormGroup
     */
    getForm(): FormGroup;

    /**
     * @description Get the data load used in search filters
     * @returns DataLoad
     */
    getDataLoad(): DataLoad;

    /**
     * @description Set the data load used in search filters
     * @param dataload
     */
    setDataLoad(dataload: DataLoad): void;

    /**
     * @description Parse the received form and return a new instace of T
     * @param form The form to parse
     * @returns T
     */
    parseForm(form: FormGroup): T;

    /**
     * @description Parse the received record (normally from a table) and return a new instace of T with record values
     * @param record The record to parse
     * @returns T
     */
    parseRecord(record: T): T;

    /**
     * @description Create a new instance of T
     * @returns T new instance
     */
    createModel(): T;

    /**
     * @description Initialize the component
     */
    init(record?: Page<T>): Observable<DataLoad>;

    /**
     * @description Search a list of records
     */
    onSearch(): void;

    /**
     * @description Export a list of records
     */
     onExport(): void;

    /**
     * @description Opens the modal to create a new record
     * @param record The record to create (optional)
     * @returns reference to current modal
     */
    onNew(record: T): NgbModalRef;

    /**
     * @description Opens the modal to update a existing record
     * @param record The record to update (mandatory)
     * @returns reference to current modal
     */
    onEdit(record: T): NgbModalRef;

    /**
     * @description Opens a modal to confirm if the record sould be deleted
     * @param record The record to create (mandatory)
     * @returns reference to current modal
     */
    onDelete(record: T): NgbModalRef;
}

export interface CrudEditComponent<T extends Core<any>> {

    /**
     * @description Get the associated service of this component
     * @returns CrudService
     */
    getService(): CrudService<T>;

    /**
     * @description Get the modal buttons used in this component
     * @returns array of ModalButton
     */
    getButtons(): ModalButton[];

    /**
     * @description Save the data in the component.
     */
    onSubmit(): void;

    /**
     * @description Get the current model in component
     * @returns T
     */
    getModel(): T;

    /**
     * @description Get the form used in search filters
     * @returns FormGroup
     */
    getForm(): FormGroup;

    /**
     * @description Parse the received form and return a new instace of T
     * @param form The form to parse
     * @returns T
     */
    parseForm(form: FormGroup): T;

    /**
     * @description Initialize the component
     */
    init(record?: T): Observable<DataLoad>;

    /**
     * @description Get the data load used in edit component
     * @returns DataLoad
     */
    getDataLoad(): DataLoad;

    /**
     * @description Set the data load used in edit component
     * @param dataload
     */
    setDataLoad(dataload: DataLoad): void;
}

@Component({
  selector: 'app-base-crud-component',
  template: '<div id="app-base-crud-component"></div>'
})
export abstract class BaseCrudComponent {
  processDataLoad(data: DataLoad) {
    this.setDataLoad(data);
    this.getDataLoad().buttons?.forEach(btn => {
      btn.handler = btn.handler && undefined !== this[btn.handler] ? this[btn.handler].bind(this) : undefined;
      btn.enabledCondition = btn.enabledCondition && undefined !== this[btn.enabledCondition]
        ? this[btn.enabledCondition].bind(this) : undefined;
    });

    this.getDataLoad().columns?.forEach(column => {
      column.cellTemplate = column.cellTemplate && undefined !== this[column.cellTemplate]
        ? this[column.cellTemplate] : undefined;
    });
  }

  /**
   * @description Get the data load used in edit component
   * @returns DataLoad
   */
  abstract getDataLoad(): DataLoad;

  /**
   * @description Set the data load used in edit component
   * @param dataload
   */
  abstract setDataLoad(dataload: DataLoad): void;
}


@Component({
  selector: 'app-crud-component',
  template: '<div id="app-crud-component"></div>'
})
export abstract class CrudComponentImpl<T extends Core<any>> extends BaseCrudComponent implements CrudComponent<T>, OnDestroy {

    /** Subject to store subscriptions and unsubscribe when component is destroyed */
    protected destroy$: Subject<boolean> = new Subject<boolean>();

    /** The modal handler */
    protected ngmodal: NgbModal;

    /** The notification service */
    protected notificationService: NotificationService;

    /** The reference to current opened modal (if any) */
    private modalRef: NgbModalRef;

    private readonly pageChanged: EventEmitter<Page<any>> = new EventEmitter<Page<any>>();

    constructor(protected injector: Injector) {
        super();
        this.ngmodal = this.injector.get(NgbModal);
        this.notificationService = this.injector.get(NotificationService);
      }

    getModalRef(): NgbModalRef {
      return this.modalRef;
    }

    getModalConfig(): NgbModalOptions {
      return {
          ariaLabelledBy: MODAL_TITLE,
          backdrop: 'static',
          centered: true,
          keyboard: true,
          size: 'lg',
          scrollable: true
      };
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    init(record?: Page<T>): Observable<DataLoad> {
      return this.getService().init(record).pipe(
        takeUntil(this.destroy$),
        tap(data => this.processDataLoad(data))
      );
    }

    onSearch(): void {
        if (!this.getForm().errors) {
            const dto: T = this.parseForm(this.getForm());
            this.getPage().filters = dto;
            this.search(this.getPage());
        }
    }

    onExport(): void {
      if (!this.getForm().errors) {
          const dto: T = this.parseForm(this.getForm());
          this.getPage().filters = dto;
          this.export(this.getPage());
      }
  }

    onNew(record?: T): NgbModalRef {
        this.modalRef = this.ngmodal.open(this.getModalComponent(), this.getModalConfig());
        this.modalRef.componentInstance.model = record === null || Array.isArray(record) ? this.createModel() : record;
        this.modalRef.componentInstance.save.pipe(takeUntil(this.destroy$)).subscribe(event => this.getService().insert(event)
                .pipe(takeUntil(this.destroy$)).subscribe(() => {
                    this.notificationService.success('i18n.messages.insert.ok');
                    this.onSearch();
                    this.modalRef.close();
                })
        );
        return this.modalRef;
    }

    onEdit(record: T): NgbModalRef {
        if (null === record || undefined === record) {
            this.notificationService.warning('i18n.validation.record.one.required');
            return null;
        }
        const dto: T = this.parseRecord(record);
        this.getService().find(dto).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.modalRef = this.ngmodal.open(this.getModalComponent(), this.getModalConfig());

          this.modalRef.componentInstance.model = data;
          this.modalRef.componentInstance.save.pipe(takeUntil(this.destroy$)).subscribe(event => this.getService().update(event)
              .pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.notificationService.success('i18n.messages.update.ok');
            this.onSearch();
            this.modalRef.close();
          }));
        });
        return this.modalRef;
    }

    onDelete(record: T): NgbModalRef {
        if (null === record || undefined === record) {
          this.notificationService.warning('i18n.validation.record.one.required');
          return null;
        }
        this.modalRef = this.ngmodal.open(ConfirmComponent, this.getModalConfig());
        this.modalRef.componentInstance.data = {
            message: 'i18n.messages.confirm.delete'
        };
        this.modalRef.result.then((confirm) => {
            if (true === confirm) {
                const dto: T = this.parseRecord(record);
                this.getService().delete(dto).pipe(takeUntil(this.destroy$)).subscribe(() => {
                    const index = this.getPage().records.indexOf(record);
                    // When the deleted record is the last in the current page, move one page back.
                    if (index > -1 && this.getPage().records.length === 1 && this.getPage().currentPage > 1) {
                      this.getPage().currentPage -= 1;
                    }
                    this.notificationService.success('i18n.messages.delete.ok');
                    this.onSearch();
                });
            }
        }, () => {});
        return this.modalRef;
    }

    parseRecord(record: T): T {
      const dto: T = this.createModel();
      dto.id = record.id;
      return dto;
    }

    getPageChanged(): Observable<Page<any>> {
      return this.pageChanged.asObservable();
    }

    /**
     * Performs a search with selected filters criteria
     *
     * @param page The page with search data
     */
    private search(page: Page<T>) {
      const thePage = Object.assign({}, page);
      thePage.currentPage = page.currentPage;
      thePage.filters = page.filters;
      thePage.pageOrder = page.pageOrder;
      thePage.size = page.size;

      thePage.records = null;
      thePage.totalPages = null;
      thePage.totalRecords = null;

      this.getService().search(thePage)
              .pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.getPage().totalPages = data.totalPages;
        this.getPage().totalRecords = data.totalRecords;
        this.getPage().records = data.records;
        this.pageChanged.emit(this.getPage());
      });
    }

    /**
     * Performs a search with selected filters criteria
     *
     * @param page The page with search data
     */
     private export(page: Page<T>) {
      const thePage = Object.assign({}, page);
      thePage.currentPage = page.currentPage;
      thePage.filters = page.filters;
      thePage.pageOrder = page.pageOrder;
      thePage.size = page.size;

      thePage.records = null;
      thePage.totalPages = null;
      thePage.totalRecords = null;

      this.getService().export(thePage)
              .pipe(takeUntil(this.destroy$)).subscribe(response => {
        const fileDownloadService = this.injector.get(FileDownloadService);
        fileDownloadService.downloadFile(response);
      });
    }

    abstract getService(): CrudService<T>;

    abstract getModalComponent(): Type<CrudEditComponent<T>>;

    abstract getPage(): Page<T>;

    abstract getButtons(): TableButton[];

    abstract getColumnModel(): AppTableColumn[];

    abstract parseForm(form: FormGroup): T;

    abstract getForm(): FormGroup;

    abstract createModel(): T;

    abstract getDataLoad(): DataLoad;

    abstract setDataLoad(dataload: DataLoad): void;
}

@Component({
  selector: 'app-crud-edit-component',
  template: '<div id="app-crud-edit-component"></div>'
})
export abstract class CrudEditComponentImpl<T extends Core<any>> extends BaseCrudComponent implements CrudEditComponent<T>, OnDestroy {

  /** Data emited when user saves the modal */
  @Output() save: EventEmitter<T> = new EventEmitter<T>();

  activeModal: NgbActiveModal;

  /** Subject to store subscriptions and unsubscribe when component is destroyed */
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(protected injector: Injector) {
    super();
    this.activeModal = this.injector.get(NgbActiveModal);
  }

  init(record?: T): Observable<DataLoad> {
    return this.getService().initEdit(record).pipe(
      takeUntil(this.destroy$),
      tap(data => this.processDataLoad(data))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (!this.getForm().errors) {
      const dto: T = this.parseForm(this.getForm());
      this.save.emit(dto);
    }
  }

  abstract getService(): CrudService<T>;

  abstract getModel(): T;

  abstract getButtons(): ModalButton[];

  abstract getForm(): FormGroup;

  abstract parseForm(form: FormGroup): T;

  abstract getDataLoad(): DataLoad;

  abstract setDataLoad(dataload: DataLoad): void;
}

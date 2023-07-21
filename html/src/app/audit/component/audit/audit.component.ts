import { Component, Injector, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { Page } from '../../../@core/common/model/page';
import { CrudComponentImpl, CrudEditComponent } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { TableButton } from '../../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../../shared/components/table/table-column.model';
import { Audit } from '../../model/audit';
import { AuditDataLoad } from '../../model/auditDataLoad';
import { AuditPage } from '../../model/auditPage';
import { AuditService } from '../../service/audit.service';
import { AuditViewComponent } from '../audit-view/audit-view.component';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent extends CrudComponentImpl<Audit>  implements OnInit {

  @ViewChild('dateColumn', { static: true }) dateColumn: TemplateRef<any>;

  /** The page to handle records */
  page: AuditPage = new AuditPage();

  /** The form with table filters */
  form: FormGroup;

  /** All available data for selection */
  data: AuditDataLoad;

  constructor(protected injector: Injector, protected service: AuditService, private readonly formBuilder: FormBuilder) {
    super(injector);
    const config = this.injector.get(AppConfigService);
    this.page.currentPage = config.getConfig().pagination.page;
    this.page.size = config.getConfig().pagination.size;
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      table: [null],
      action: [],
      user: ['', Validators.maxLength(10)],
      created: [],
      requestId: ['', Validators.maxLength(36)],
      pairKey: ['', Validators.maxLength(36)]
    });
  }

  getService(): CrudService<Audit> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<Audit>> {
    return AuditViewComponent;
  }

  getModalConfig(): NgbModalOptions {
    const config = super.getModalConfig();
    config.size = 'xl';
    return config;
  }

  getPage(): Page<Audit> {
    return this.page;
  }

  getButtons(): TableButton[] {
    return this.data?.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.data?.columns;
  }

  parseForm(form: FormGroup): Audit {
    const model: Audit = new Audit();
    model.table = form.get('table').value?.name;
    model.action = form.get('action').value?.name;
    model.user = form.get('user').value;
    model.created = form.get('created').value;
    model.requestId = form.get('requestId').value;
    model.pairKey = form.get('pairKey').value;
    return model;
  }

  parseRecord(record: Audit): Audit {
    const dto = super.parseRecord(record);
    dto.pairKey = record.pairKey;
    dto.table = record.table;
    return dto;
  }

  getForm(): FormGroup {
    return this.form;
  }

  createModel(): Audit {
    return new Audit();
  }

  setDataLoad(dataload: DataLoad): void {
      this.data = dataload as AuditDataLoad;
  }

  getDataLoad(): DataLoad {
      return this.data;
  }
}

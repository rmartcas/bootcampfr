import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { CrudEditComponentImpl } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';
import { Audit } from '../../model/audit';

const NOT_IMPLEMENTED = 'Method not implemented.';

@Component({
  selector: 'app-audit-view',
  templateUrl: './audit-view.component.html',
  styleUrls: ['./audit-view.component.scss']
})
export class AuditViewComponent extends CrudEditComponentImpl<Audit> implements OnInit {

  /** The model data */
  @Input() model: Audit | any;

  /** The form with data */
  form: FormGroup;

  /** All available data for selection */
  data: any = {
    keys: [],
    excludedKeys: ['audit_id', 'request_id', 'pair_key', 'audit_action', 'audit_step', 'audit_user', 'audit_date'],
    before: [],
    after: [],
    buttons: []
  };

  constructor(protected injector: Injector) {
    super(injector);
  }

  getService(): CrudService<Audit> {
    throw new Error(NOT_IMPLEMENTED);
  }
  getDataLoad(): DataLoad {
    throw new Error(NOT_IMPLEMENTED);
  }
  setDataLoad(): void {
    throw new Error(NOT_IMPLEMENTED);
  }

  getButtons(): ModalButton[] {
    return this.data?.buttons;
  }

  getModel(): Audit {
    return this.model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  parseForm(): Audit {
    return this.getModel();
  }

  ngOnInit(): void {
    // Group the data by step (before or after)
    for (const key in this.model) {
      if (Object.prototype.hasOwnProperty.call(this.model, key)) {
        const record = this.model[key];
        this.data.keys = [...new Set([...this.data.keys, ...Object.keys(record)])];
        if (record.audit_step.toLowerCase() === 'before') {
          this.data.before.push(record);
        } else {
          this.data.after.push(record);
        }
      }
    }
    this.data.keys = this.data.keys.filter((key: string) => !this.data.excludedKeys.includes(key));
  }
}

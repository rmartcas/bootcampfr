import { Component, Injector, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { Page } from '../../../@core/common/model/page';
import { CrudComponentImpl, CrudEditComponent } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { TableButton } from '../../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../../shared/components/table/table-column.model';
import { Mapping } from '../../model/mapping';
import { MappingDataLoad } from '../../model/mappingDataLoad';
import { MappingPage } from '../../model/mappingPage';
import { MappingService } from '../../service/mapping.service';
import { MappingEditComponent } from '../mapping-edit/mapping-edit.component';
import { MappingValidateComponent } from '../mapping-validate/mapping-validate.component';

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.scss']
})
export class MappingsComponent extends CrudComponentImpl<Mapping> implements OnInit {

  /** The page to search data */
  public page: MappingPage = new MappingPage();

  /** The form with filters */
  form: FormGroup;

  /** All available authorities for selection */
  data: MappingDataLoad;

  constructor(protected injector: Injector, private readonly service: MappingService, private readonly formBuilder: FormBuilder) {
    super(injector);
    const config = this.injector.get(AppConfigService);
    this.page.currentPage = config.getConfig().pagination.page;
    this.page.size = -1;
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      pattern: ['', Validators.maxLength(250)],
      position: ['', Validators.maxLength(2)],
      authorities: []
    });
    this.onSearch();
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as MappingDataLoad;
  }

  getService(): CrudService<Mapping> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<Mapping>> {
    return MappingEditComponent;
  }

  getPage(): Page<Mapping> {
    return this.page;
  }

  getButtons(): TableButton[] {
    return this.data?.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.data?.columns;
  }

  parseForm(form: FormGroup): Mapping {
    const model: Mapping = new Mapping();
    model.pattern = form.controls.pattern.value;
    model.position = form.controls.position.value;
    model.authorities = form.controls.authorities.value?.map(x => ({id : x.id}));
    return model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  createModel(): Mapping {
    return new Mapping();
  }

  hasNullId(mapping: Mapping): boolean {
    return mapping.id === undefined;
  }

  hasNotNullId(mapping: Mapping): boolean {
    return mapping.id !== undefined;
  }

  onValidate(): NgbModalRef {
    const modalRef = this.ngmodal.open(MappingValidateComponent, {
      ariaLabelledBy: 'modal-title',
      backdrop: 'static',
      centered: true,
      keyboard: true,
      size: 'xl',
      scrollable: true
    });
    this.service.validate().pipe(takeUntil(this.destroy$)).subscribe(data => {
      const report = Object.keys(data).map((key) => this.getMappingRow(key, data));
      modalRef.componentInstance.data = report;
    });
    return modalRef;
  }

  private getMappingRow(key: string, data: any) {
    const parent = this.getParent(key);
    const children = this.hasChidrens(key.replace('/**', ''), data);
    return {
      key,
      value: data[key],
      isAccesible: data[key].length > 0,
      parent,
      me: key.replace('/**', ''),
      children,
      treeStatus: children ? 'collapsed' : 'disabled'
    };
  }

  private getParent(path: string): string {
    let offset = path.lastIndexOf('/');
    let parent = path.substr(0, offset === 0 ? 1: offset);

    if (path.substr(offset) === '/**') {
      offset = parent.lastIndexOf('/');
      parent = parent.substr(0, offset === 0 ? 1: offset);
    }
    return parent === path ? '' : parent;
  }

  private hasChidrens(key: string, data: any): boolean {
    const childs = Object.keys(data).find(val => {
      const filter = key === '/' ? key : key + '/';
      return val !== key && val.startsWith(filter);
    });
    return childs !== undefined && childs.length > 0;
  }
}

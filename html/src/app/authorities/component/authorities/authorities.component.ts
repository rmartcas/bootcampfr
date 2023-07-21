import { Component, Injector, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorityPage } from '../../model/authorityPage';
import { AuthorityService } from '../../service/authority.service';
import { Authority } from '../../model/authority';
import { AuthorityEditComponent } from '../authority-edit/authority-edit.component';
import { Page } from '../../../@core/common/model/page';
import { CrudComponentImpl, CrudEditComponent } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { TableButton } from '../../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../../shared/components/table/table-column.model';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { AuthorityDataLoad } from '../../model/authorityDataLoad';

@Component({
  selector: 'app-authorities',
  templateUrl: './authorities.component.html',
  styleUrls: ['./authorities.component.scss']
})
export class AuthoritiesComponent extends CrudComponentImpl<Authority> implements OnInit {

  /** The page to handle records */
  page: AuthorityPage = new AuthorityPage();

  /** The form with table filters */
  form: FormGroup;

  /** All available data for selection */
  data: AuthorityDataLoad;

  constructor(protected injector: Injector, protected service: AuthorityService, private readonly formBuilder: FormBuilder) {
    super(injector);
    const config = this.injector.get(AppConfigService);
    this.page.currentPage = config.getConfig().pagination.page;
    this.page.size = config.getConfig().pagination.size;
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as AuthorityDataLoad;
  }

  getService(): CrudService<Authority> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<Authority>> {
    return AuthorityEditComponent;
  }

  getPage(): Page<Authority> {
    return this.page;
  }

  getButtons(): TableButton[] {
    return this.data?.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.data?.columns;
  }

  parseForm(form: FormGroup): Authority {
    const model: Authority = new Authority();
    model.name = form.controls.name.value;
    model.description = form.controls.description.value;
    return model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  createModel(): Authority {
    return new Authority();
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      name: ['', Validators.maxLength(100)],
      description: ['', Validators.maxLength(250)]
    });
    this.onSearch();
  }
}

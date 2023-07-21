import { Component, Injector, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { Page } from '../../../@core/common/model/page';
import { CrudComponentImpl, CrudEditComponent } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { TableButton } from '../../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../../shared/components/table/table-column.model';
import { User } from '../../model/user';
import { UserDataLoad } from '../../model/userDataLoad';
import { UserPage } from '../../model/userPage';
import { UserService } from '../../service/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends CrudComponentImpl<User> implements OnInit {

  /** The page to handle records */
  page: UserPage = new UserPage();

  /** The form with table filters */
  form: FormGroup;

  /** All available profiles for selection */
  data: UserDataLoad;

  constructor(protected injector: Injector, protected service: UserService, private readonly formBuilder: FormBuilder) {
    super(injector);
    const config = this.injector.get(AppConfigService);
    this.page.currentPage = config.getConfig().pagination.page;
    this.page.size = config.getConfig().pagination.size;
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      username: ['', Validators.maxLength(10)],
      name: ['', Validators.maxLength(100)],
      email: ['', Validators.maxLength(100)],
      profile: []
    });
    this.onSearch();
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as UserDataLoad;
  }

  getService(): CrudService<User> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<User>> {
    return UserEditComponent;
  }

  getPage(): Page<User> {
    return this.page;
  }

  getButtons(): TableButton[] {
    return this.data?.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.data?.columns;
  }

  parseForm(form: FormGroup): User {
    const model: User = new User();
    model.username = form.controls.username.value;
    model.name = form.controls.name.value;
    model.email = form.controls.email.value;
    model.profile = {
      id: this.form.controls.profile.value?.id
    };
    return model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  createModel(): User {
    return new User();
  }
}

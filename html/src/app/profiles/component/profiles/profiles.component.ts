import { Component, Injector, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { Page } from '../../../@core/common/model/page';
import { CrudComponentImpl, CrudEditComponent } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { TableButton } from '../../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../../shared/components/table/table-column.model';
import { Profile } from '../../model/profile';
import { ProfileDataLoad } from '../../model/profileDataLoad';
import { ProfilePage } from '../../model/profilePage';
import { ProfileService } from '../../service/profile.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends CrudComponentImpl<Profile> implements OnInit {

  @ViewChild('isTrueFalseColumn', { static: true }) isTrueFalseColumn: TemplateRef<any>;

  /** The page to handle records */
  page: ProfilePage = new ProfilePage();

  /** The form with table filters */
  form: FormGroup;

  data: ProfileDataLoad;

  constructor(protected injector: Injector, protected service: ProfileService, private readonly formBuilder: FormBuilder) {
    super(injector);
    const config = this.injector.get(AppConfigService);
    this.page.currentPage = config.getConfig().pagination.page;
    this.page.size = config.getConfig().pagination.size;
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      name: ['', Validators.maxLength(100)],
      description: ['', Validators.maxLength(250)]
    });
    this.onSearch();
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as ProfileDataLoad;
  }

  getService(): CrudService<Profile> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<Profile>> {
    return ProfileEditComponent;
  }

  getPage(): Page<Profile> {
    return this.page;
  }

  getButtons(): TableButton[] {
    return this.data?.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.data?.columns;
  }

  parseForm(form: FormGroup): Profile {
    const model: Profile = new Profile();
    model.name = form.controls.name.value;
    model.description = form.controls.description.value;
    return model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  createModel(): Profile {
    return new Profile();
  }
}

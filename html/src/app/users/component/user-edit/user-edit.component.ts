import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { CrudEditComponentImpl } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';
import { User } from '../../model/user';
import { UserDataLoad } from '../../model/userDataLoad';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends CrudEditComponentImpl<User> implements OnInit {

  /** The model data */
  @Input() model: User;

  /** The form with data */
  form: FormGroup;

  /** All available profiles for selection */
  data: UserDataLoad;

  constructor(protected injector: Injector, private readonly service: UserService, private readonly formBuilder: FormBuilder) {
    super(injector);
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

    getButtons(): ModalButton[] {
      return this.data?.buttons;
    }

    getModel(): User {
      return this.model;
    }

    getForm(): FormGroup {
      return this.form;
    }

    parseForm(form: FormGroup): User {
      const model: User = this.getModel();
      model.username = form.controls.username.value;
      model.name = form.controls.name.value;
      model.email = form.controls.email.value;
      model.profile = {
        id: form.controls.profile.value.id
      };
      return model;
    }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      username: [this.model.username, [Validators.required, Validators.maxLength(10)]],
      name: [this.model.name, [Validators.required, Validators.maxLength(100)]],
      email: [this.model.email, [Validators.required, Validators.maxLength(100)]],
      profile: [this.model.profile, [Validators.required]]
    });
  }
}

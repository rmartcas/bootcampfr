import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { CrudEditComponentImpl } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';
import { Authority } from '../../model/authority';
import { AuthorityDataLoad } from '../../model/authorityDataLoad';
import { AuthorityService } from '../../service/authority.service';

@Component({
  selector: 'app-authority-edit',
  templateUrl: './authority-edit.component.html',
  styleUrls: ['./authority-edit.component.scss']
})
export class AuthorityEditComponent extends CrudEditComponentImpl<Authority> implements OnInit {

  /** The authority data */
  @Input() model: Authority;

  /** The form with data */
  form: FormGroup;

  /** All available profiles for selection */
  data: AuthorityDataLoad;

  constructor(protected injector: Injector, private readonly service: AuthorityService, private readonly formBuilder: FormBuilder) {
    super(injector);
  }

  getService(): CrudService<Authority> {
    return this.service;
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as AuthorityDataLoad;
  }

  getButtons(): ModalButton[] {
    return this.data?.buttons;
  }

  getModel(): Authority {
    return this.model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  parseForm(form: FormGroup): Authority {
    const model: Authority = this.getModel();
    model.name = form.controls.name.value;
    model.description = form.controls.description.value;
    model.profiles = form.controls.profiles.value.map(x => ({id : x.id}));
    return model;
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      name: [this.model.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.model.description, [Validators.required, Validators.maxLength(250)]],
      profiles: [this.model.profiles]
    });
  }
}

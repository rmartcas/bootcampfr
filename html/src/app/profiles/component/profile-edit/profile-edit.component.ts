import { Component, Injector, Input,  OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { CrudEditComponentImpl } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';
import { Profile } from '../../model/profile';
import { ProfileDataLoad } from '../../model/profileDataLoad';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends CrudEditComponentImpl<Profile> implements OnInit {

 /** The profile data */
 @Input() model: Profile;

 /** The form with data */
 form: FormGroup;

 /** All available authorities for selection */
 data: ProfileDataLoad;

 constructor(protected injector: Injector, private readonly service: ProfileService, private readonly formBuilder: FormBuilder) {
  super(injector);
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

getButtons(): ModalButton[] {
  return this.data?.buttons;
}

getModel(): Profile {
  return this.model;
}

getForm(): FormGroup {
  return this.form;
}

parseForm(form: FormGroup): Profile {
  const model: Profile = this.getModel();
  model.name = form.controls.name.value;
  model.description = form.controls.description.value;
  model.default = form.controls.default.value;
  model.authorities = form.controls.authorities.value.map(x => ({id : x.id}));
  return model;
}

 ngOnInit(): void {
  this.init().subscribe();
   this.form = this.formBuilder.group({
     name: [this.model.name, [Validators.required, Validators.maxLength(100)]],
     description: [this.model.description, [Validators.required, Validators.maxLength(250)]],
     authorities: [this.model.authorities, [Validators.required]],
     default: [this.model.default]
   });
 }
}

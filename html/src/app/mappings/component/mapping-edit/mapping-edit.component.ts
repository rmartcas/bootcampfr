import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { CrudEditComponentImpl } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';
import { Mapping } from '../../model/mapping';
import { MappingDataLoad } from '../../model/mappingDataLoad';
import { MappingService } from '../../service/mapping.service';

@Component({
  selector: 'app-mapping-edit',
  templateUrl: './mapping-edit.component.html',
  styleUrls: ['./mapping-edit.component.scss']
})
export class MappingEditComponent extends CrudEditComponentImpl<Mapping> implements OnInit {

  /** The data */
  @Input() model: Mapping;

  /** The form with data */
  form: FormGroup;

  /** All available data for selection */
  data: MappingDataLoad;

  constructor(protected injector: Injector, private readonly service: MappingService, private readonly formBuilder: FormBuilder) {
    super(injector);
  }

  getService(): CrudService<Mapping> {
    return this.service;
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as MappingDataLoad;
  }

  getButtons(): ModalButton[] {
    return this.data?.buttons;
  }

  getModel(): Mapping {
    return this.model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  parseForm(form: FormGroup): Mapping {
    const model: Mapping = this.getModel();
    model.pattern = form.controls.pattern.value.id;
    model.position = form.controls.position.value;
    model.authorities = form.controls.authorities.value?.map(x => ({id : x.id}));
    return model;
  }

  ngOnInit(): void {
    this.init().subscribe();
    const p = this.model.pattern ? { id: this.model.pattern, name: this.model.pattern} : this.model.pattern;
    this.form = this.formBuilder.group({
      pattern: [ p, [Validators.required, Validators.maxLength(250)]],
      position: [this.model.position, [Validators.maxLength(2)]],
      authorities: [this.model.authorities, [Validators.required]]
    });
  }

}

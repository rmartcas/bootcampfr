import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { CrudEditComponentImpl } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';
import { Menu } from '../../model/menu';
import { MenuDataLoad } from '../../model/menuDataLoad';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent extends CrudEditComponentImpl<Menu> implements OnInit {

  /** The data */
  @Input() model: Menu;

  /** The form with data */
  form: FormGroup;

  /** All available data for selection */
  data: MenuDataLoad;

  constructor(protected injector: Injector, private readonly service: MenuService, private readonly formBuilder: FormBuilder) {
    super(injector);
  }

  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as MenuDataLoad;
  }

  getService(): CrudService<Menu> {
    return this.service;
  }

  getButtons(): ModalButton[] {
    return this.data?.buttons;
  }

  getModel(): Menu {
    return this.model;
  }

  getForm(): FormGroup {
    return this.form;
  }

  parseForm(form: FormGroup): Menu {
    const model: Menu = this.getModel();
    model.title = form.controls.title.value;
    model.link = form.controls.link.value;
    model.icon = form.controls.icon.value;
    model.enabled = form.controls.enabled.value;
    model.position = form.controls.position.value;
    model.parent = form.controls.parent?.value;
    model.authorities = form.controls.authorities.value?.map(x => ({id : x.id}));
    return model;
  }

  ngOnInit(): void {
    this.init().subscribe();
    this.form = this.formBuilder.group({
      title: [ this.model.title, [Validators.required, Validators.maxLength(250)]],
      link: [ this.model.link, [Validators.required, Validators.maxLength(250)]],
      icon: [ this.model.icon, [Validators.maxLength(100)]],
      enabled: [ this.model.enabled],
      position: [this.model.position, [Validators.maxLength(2)]],
      parent: [this.model.parent ? { id: this.model.parent.id, name: this.model.parent.title} : this.model.parent],
      authorities: [this.model.authorities]
    });
  }

}

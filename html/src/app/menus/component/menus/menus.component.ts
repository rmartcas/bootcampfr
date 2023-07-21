import { Component, Injector, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoad } from '../../../@core/common/model/dataLoad';
import { Page } from '../../../@core/common/model/page';
import { CrudComponentImpl, CrudEditComponent } from '../../../@core/crud/crud-component';
import { CrudService } from '../../../@core/crud/crud-service';
import { AppConfigService } from '../../../@core/modules/app-config/app-config.service';
import { TableButton } from '../../../shared/components/table/table-button.model';
import { AppTableColumn } from '../../../shared/components/table/table-column.model';
import { Menu } from '../../model/menu';
import { MenuDataLoad } from '../../model/menuDataLoad';
import { MenuPage } from '../../model/menuPage';
import { MenuService } from '../../service/menu.service';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent extends CrudComponentImpl<Menu>  implements OnInit {

    @ViewChild('iconColumn', { static: true }) iconColumn: TemplateRef<any>;
    @ViewChild('enabledColumn', { static: true }) enabledColumn: TemplateRef<any>;
    @ViewChild('titleColumn', { static: true }) titleColumn: TemplateRef<any>;

    /** The page to search data */
    public page: MenuPage = new MenuPage();

    /** The form with filters */
    form: FormGroup;

    /** All available authorities for selection */
    data: MenuDataLoad;

    constructor(protected injector: Injector, private readonly service: MenuService, private readonly formBuilder: FormBuilder) {
      super(injector);
      const config = this.injector.get(AppConfigService);
      this.page.currentPage = config.getConfig().pagination.page;
      this.page.size = -1;
    }

    ngOnInit(): void {
      this.init().subscribe();
      this.form = this.formBuilder.group({
        title: ['', Validators.maxLength(250)],
        link: ['', Validators.maxLength(250)],
        authorities: []
      });
      this.onSearch();
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

    getModalComponent(): Type<CrudEditComponent<Menu>> {
      return MenuEditComponent;
    }

    getPage(): Page<Menu> {
      return this.page;
    }

    getButtons(): TableButton[] {
      return this.data?.buttons;
    }

    getColumnModel(): AppTableColumn[] {
      return this.data?.columns;
    }

    parseForm(form: FormGroup): Menu {
      const model: Menu = new Menu();
      model.title = form.controls.title.value;
      model.link = form.controls.link.value;
      model.authorities = form.controls.authorities.value?.map(x => ({id : x.id}));
      return model;
    }

    getForm(): FormGroup {
      return this.form;
    }

    createModel(): Menu {
      return new Menu();
    }
}

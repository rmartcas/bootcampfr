import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudServiceImpl } from '../../@core/crud/crud-service';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { Menu } from '../model/menu';

@Injectable()
export class MenuService extends CrudServiceImpl<Menu> {

  constructor(http: HttpClient, appConfig: AppConfigService) {
    super(http, appConfig);
  }

  getServiceUrl(): any {
    return this.config.getConfig().api.menus;
  }
}

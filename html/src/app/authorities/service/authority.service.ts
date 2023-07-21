import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authority } from '../model/authority';
import { CrudServiceImpl } from '../../@core/crud/crud-service';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';

@Injectable()
export class AuthorityService extends CrudServiceImpl<Authority> {

  constructor(http: HttpClient, appConfig: AppConfigService) {
    super(http, appConfig);
  }

  getServiceUrl(): any {
    return this.config.getConfig().api.authorities;
  }
}

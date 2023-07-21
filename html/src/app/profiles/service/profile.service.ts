import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../model/profile';
import { CrudServiceImpl } from '../../@core/crud/crud-service';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';

@Injectable()
export class ProfileService extends CrudServiceImpl<Profile> {

  constructor(http: HttpClient, appConfig: AppConfigService) {
    super(http, appConfig);
  }

  getServiceUrl(): any {
    return this.config.getConfig().api.profiles;
  }
}

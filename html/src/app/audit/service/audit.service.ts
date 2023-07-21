import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudServiceImpl } from '../../@core/crud/crud-service';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { Audit } from '../model/audit';

@Injectable({
  providedIn: 'root'
})
export class AuditService extends CrudServiceImpl<Audit> {

  constructor(protected readonly http: HttpClient, protected readonly appConfig: AppConfigService) {
    super(http, appConfig);
   }

  getServiceUrl(): any {
    return this.appConfig.getConfig().api.audit;
  }

  find(record: Audit): Observable<any> {
    return this.prepareCall('findByPairKey', 'POST', record);
  }
}

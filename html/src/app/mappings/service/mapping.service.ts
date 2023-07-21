import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Page } from '../../@core/common/model/page';

import { CrudServiceImpl } from '../../@core/crud/crud-service';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';
import { Mapping } from '../model/mapping';

@Injectable()
export class MappingService extends CrudServiceImpl<Mapping> {

  constructor(http: HttpClient, appConfig: AppConfigService) {
    super(http, appConfig);
  }

  getServiceUrl(): any {
    return this.config.getConfig().api.mappings;
  }

  validate(): Observable<any> {
    return this.prepareCall('validate', 'GET');
  }

  search(record: Page<Mapping>): Observable<Page<Mapping>> {
    return super.search(record).pipe(tap(
      page => page.records.map((r) => this.getMappingRow(r.pattern, r))
    ));
  }

  private getMappingRow(key: string, data: any) {
    const parent = this.getParent(key);
    data.parent = parent;
    data.me = data.pattern.replace('/**', '');
  }

  private getParent(path: string): string {
    let offset = path.lastIndexOf('/');
    let parent = path.substr(0, offset === 0 ? 1: offset);

    if (path.substr(offset) === '/**') {
      offset = parent.lastIndexOf('/');
      parent = parent.substr(0, offset === 0 ? 1: offset);
    }
    return parent === path ? '' : parent;
  }
}

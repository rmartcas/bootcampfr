import { Injectable } from '@angular/core';
import { CrudServiceImpl } from 'src/app/@core/crud/crud-service';
import { Libro } from '../model/libro';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/@core/modules/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService extends CrudServiceImpl<Libro>{

  constructor(http: HttpClient, appConfig: AppConfigService) {
    super(http, appConfig);
  }
  
  getServiceUrl() {
    return this.config.getConfig().api.libro;
  }

  
}

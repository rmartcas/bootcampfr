import { Observable } from 'rxjs';
import { Page } from '../common/model/page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../modules/app-config/app-config.service';
import { environment } from '../../../environments/environment';
import { DataLoad } from '../common/model/dataLoad';
import { UndefinedApiError } from '../modules/global-error-handler/model/undefined-api-error';
import { Recaptcha } from '../modules/security/recaptcha/recaptcha';
import { Core } from '../common/model/core';

export interface CrudService<T> {
    /**
     * @description Persist a new record of T
     * @param record The record to persist
     * @returns observable
     */
    insert(record: T): Observable<T>;

    /**
     * @description Updates an existing record
     * @param record The record to update
     * @returns observable
     */
    update(record: T): Observable<T>;

    /**
     * @description Delete an existing record
     * @param record The record to delete
     * @returns observable
     */
    delete(record: T): Observable<T>;

    /**
     * @description Find an existing record
     * @param record The record to find
     * @returns observable
     */
    find(record: T): Observable<T>;

    /**
     * @description Search a list of records
     * @param record The record to delete
     * @returns observable
     */
    search(record: Page<T>): Observable<Page<T>>;

    /**
     * @description Search a list of records
     * @param record The record to delete
     * @returns observable
     */
     export(record: Page<T>): Observable<any>;

    /**
     * @description Get initial data for the service
     * @returns observable
     */
    init(record?: Page<T>): Observable<DataLoad>;

    /**
     * @description Get initial data for new or edit models
     * @returns observable
     */
     initEdit(record?: T): Observable<DataLoad>;

    /**
     * @description Get the path url for the service impl. Must be implemented on each service
     * @returns the service api url
     */
    getServiceUrl(): any;
}

export abstract class CrudServiceImpl<T> implements CrudService<T>, Recaptcha {

    /**
     * @description Constructor
     */
    constructor(protected http: HttpClient, protected config: AppConfigService) {
    }

    insert(record: T): Observable<T> {
        return this.prepareCall('insert', 'POST', record);
    }
    update(record: T): Observable<T> {
        return this.prepareCall('update', 'POST', record);
    }
    delete(record: T): Observable<T> {
        return this.prepareCall('delete', 'POST', record);
    }
    find(record: T): Observable<T> {
        return this.prepareCall('find', 'POST', record);
    }
    search(record: Page<T>): Observable<Page<T>> {
        return this.prepareCall('search', 'POST', record);
    }
    export(record: Page<T>): Observable<any> {
        const options = {
            responseType: 'blob' as 'json',
            observe: 'response',
        };
        return this.prepareCall('export', 'POST', record, options);
    }
    init(record?: Page<T>): Observable<DataLoad> {
        return this.prepareCall('init', record ? 'POST' : 'GET', record);
    }
    initEdit(record?: T): Observable<DataLoad> {
        return this.prepareCall('initedit', record ? 'POST' : 'GET', record);
    }

    getRecaptcha(config: AppConfigService, url: any): HttpHeaders {
        const headers = new HttpHeaders();
        if (this.config.getConfig().recaptcha?.siteKey !== undefined && url.action !== undefined) {
            return headers.set(config.getConfig().recaptcha.headerName, url.action);
        }
        return headers;
    }

    protected prepareCall(call: string, method: string, record?: Page<T> | T | DataLoad | Core<any>, options: any = {}): Observable<any> {
        try {
            const serviceUrl = this.getServiceUrl();
            const api = serviceUrl[call];
            const apiMethod = api[method];
            const headers = this.getRecaptcha(this.config, apiMethod);
            if (options.headers !== undefined) {
                for(const key of headers.keys()) {
                    options.headers = options.headers.set(key, headers.get(key));
                }
            } else {
                options.headers = headers;
            }
            switch (method) {
                case 'GET':
                    return this.http.get<any>(environment.api.base + apiMethod.url, options);
                case 'POST':
                    return this.http.post<any>(environment.api.base + apiMethod.url, record, options );
                case 'PUT':
                    return this.http.put<any>(environment.api.base + apiMethod.url, record, options );
                case 'DELETE':
                    return this.http.delete<any>(environment.api.base + apiMethod.url, options );
                default:
                    break;
            }
            return undefined;
        } catch (error) {
            if(error instanceof TypeError) {
                throw new UndefinedApiError();
            }
            throw error;
        }
    }

    abstract getServiceUrl(): any;

}

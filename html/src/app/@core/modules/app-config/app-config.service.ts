import { Injectable } from '@angular/core';
import { Config } from '../../common/model/config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public cache$: Observable<Config>;
  private readonly configSubject: BehaviorSubject<Config> = new BehaviorSubject<Config>(new Config());

  constructor(private readonly http: HttpClient) {
    this.cache$ = this.configSubject.asObservable();
  }

  load(): Observable<Config> {
      return this.config().pipe(tap(c => this.configSubject.next(c)));
  }

  getConfig(): Config {
    return this.configSubject.getValue();
  }

  private config(): Observable<Config> {
      return this.http.get<Config>(environment.api.base + environment.api.config).pipe(
        share()
      );
  }
}

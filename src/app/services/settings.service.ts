import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Settings } from '../store/models/settings.model';

import { url } from '../../helpers/constants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  public loadSettings(): Observable<Array<Settings>> {
    return this.httpClient.get(`${url}/api/settings`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public addSettings(settings: Settings): Observable<Settings> {
    return this.httpClient.post(`${url}/api/settings`, settings)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public editSettings(settings: Settings): Observable<Settings> {
    return this.httpClient.put(`${url}/api/settings/${settings._id}`, settings)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}

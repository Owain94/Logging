import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Settings } from '../store/models/settings.model';

import { url } from '../../helpers/constants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SettingsService {
  private options: RequestOptions;

  constructor(private http: Http) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  public loadSettings(): Observable<Settings> {
    return this.http.get(`${url}/api/settings`)
      .map(res => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public addSettings(settings: Settings): Observable<Settings> {
    return this.http.post(`${url}/api/settings`, settings, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public editSettings(settings: Settings): Observable<Settings> {
    return this.http.put(`${url}/api/settings/${settings._id}`, settings, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}

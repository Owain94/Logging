import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Log } from '../store/models/log.model';

import { url } from '../../helpers/constants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LogService {
  constructor(private httpClient: HttpClient) {}

  public loadLogs(): Observable<Array<Log>> {
    return this.httpClient.get(`${url}/api/log`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public addLog(log: Log): Observable<Log> {
    return this.httpClient.post(`${url}/api/log`, log)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public editLog(log: Log): Observable<Log> {
    return this.httpClient.put(`${url}/api/log/${log._id}`, log)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public deleteLog(log: Log): Observable<Log> {
    return this.httpClient.delete(`${url}/api/log/${log._id}`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}

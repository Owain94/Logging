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
  constructor(private http: HttpClient) {}

  loadLogs(): Observable<Array<Log>> {
    return this.http.get(`${url}/api/log`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  addLog(singleLog: Log): Observable<Object> {
    return this.http.post(`${url}/api/log`, singleLog)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  editLog(singleLog: Log): Observable<Object> {
    return this.http.put(`${url}/api/log/${singleLog._id}`, singleLog)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  deleteLog(singleLog: Log): Observable<Object> {
    return this.http.delete(`${url}/api/log/${singleLog._id}`)
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}

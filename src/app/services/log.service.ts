import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Log } from '../store/models/log.model';

import { url } from '../../helpers/constants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LogService {
  private options: RequestOptions;

  constructor(private http: Http) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  public loadLogs(): Observable<Array<Log>> {
    return this.http.get(`${url}/api/log`)
      .map(res => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public addLog(singleLog: Log): Observable<Log> {
    return this.http.post(`${url}/api/log`, singleLog, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public editLog(singleLog: Log): Observable<Log> {
    return this.http.put(`${url}/api/log/${singleLog._id}`, singleLog, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }

  public deleteLog(singleLog: Log): Observable<Log> {
    return this.http.delete(`${url}/api/log/${singleLog._id}`, this.options)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw({ error: 'true' }));
  }
}

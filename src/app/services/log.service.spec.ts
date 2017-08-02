import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { url } from '../../helpers/constants';

import { LogService } from './log.service';

import { Log } from '../store/models/log.model';

describe('The log service', () => {
  let logService: LogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LogService
      ]
    });

    logService = TestBed.get(LogService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should instantiate',
    inject([LogService], (service: LogService) => {
      expect(service instanceof LogService).toBeTruthy();
    })
  );

  describe('loadLogs()', () => {
    it('should return an Observable<Array<Log>>', (done: any) => {
      const mockResponse = [{
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      }, {
        '_id': '2',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '2',
        'result': 'test'
      }];

      logService.loadLogs().subscribe((logs) => {
        expect(logs.length).toEqual(2);
        expect(logs[0]._id).toEqual('1');
        expect(logs[0].what).toEqual('test');
        expect(logs[0].why).toEqual('test');
        expect(logs[0].how).toEqual('test');
        expect(logs[0].with).toEqual('test');
        expect(logs[0].who).toEqual('test');
        expect(logs[0].where).toEqual('test');
        expect(logs[0].when).toEqual('01/01/1970, 00:00:00');
        expect(logs[0].case).toEqual('1');
        expect(logs[0].result).toEqual('');
        expect(logs[1]._id).toEqual('2');
        expect(logs[1].what).toEqual('test');
        expect(logs[1].why).toEqual('test');
        expect(logs[1].how).toEqual('test');
        expect(logs[1].with).toEqual('test');
        expect(logs[1].who).toEqual('test');
        expect(logs[1].where).toEqual('test');
        expect(logs[1].when).toEqual('01/01/1970, 00:00:00');
        expect(logs[1].case).toEqual('2');
        expect(logs[1].result).toEqual('test');
        done();
      });

      const logRequest = httpMock.expectOne(`${url}/api/log`);
      logRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      logService.loadLogs().subscribe((logs) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const logRequest = httpMock.expectOne(`${url}/api/log`);
      logRequest.error(new ErrorEvent('error'));
    });
  });

  describe('addLog()', () => {
    it('should return an Observable<Log>', (done: any) => {
      const payload: Log = {
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      };

      const mockResponse = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': '',
        'error': 'false'
      };

      logService.addLog(payload).subscribe((log) => {
        expect(log._id).toEqual('1');
        expect(log.what).toEqual('test');
        expect(log.why).toEqual('test');
        expect(log.how).toEqual('test');
        expect(log.with).toEqual('test');
        expect(log.who).toEqual('test');
        expect(log.where).toEqual('test');
        expect(log.when).toEqual('01/01/1970, 00:00:00');
        expect(log.case).toEqual('1');
        expect(log.result).toEqual('');
        expect(JSON.parse(log.error)).toBeFalsy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/log`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Log = {
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      };

      logService.addLog(payload).subscribe((log) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const logRequest = httpMock.expectOne(`${url}/api/log`);
      logRequest.error(new ErrorEvent('error'));
    });
  });

  describe('editLog()', () => {
    it('should return an Observable<Log>', (done: any) => {
      const payload: Log = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      };

      const mockResponse = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': '',
        'error': 'false'
      };

      logService.editLog(payload).subscribe((log) => {
        expect(log._id).toEqual('1');
        expect(log.what).toEqual('test');
        expect(log.why).toEqual('test');
        expect(log.how).toEqual('test');
        expect(log.with).toEqual('test');
        expect(log.who).toEqual('test');
        expect(log.where).toEqual('test');
        expect(log.when).toEqual('01/01/1970, 00:00:00');
        expect(log.case).toEqual('1');
        expect(log.result).toEqual('');
        expect(JSON.parse(log.error)).toBeFalsy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/log/1`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Log = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      };

      logService.editLog(payload).subscribe((log) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const logRequest = httpMock.expectOne(`${url}/api/log/1`);
      logRequest.error(new ErrorEvent('error'));
    });
  });

  describe('deleteLog()', () => {
    it('should return an Observable<Log>', (done: any) => {
      const payload: Log = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      };

      const mockResponse = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': '',
        'error': 'false'
      };

      logService.deleteLog(payload).subscribe((log) => {
        expect(log._id).toEqual('1');
        expect(log.what).toEqual('test');
        expect(log.why).toEqual('test');
        expect(log.how).toEqual('test');
        expect(log.with).toEqual('test');
        expect(log.who).toEqual('test');
        expect(log.where).toEqual('test');
        expect(log.when).toEqual('01/01/1970, 00:00:00');
        expect(log.case).toEqual('1');
        expect(log.result).toEqual('');
        expect(JSON.parse(log.error)).toBeFalsy();
        done();
      });

      const casesRequest = httpMock.expectOne(`${url}/api/log/1`);
      casesRequest.flush(mockResponse);
    });

    it('should throw an Observable<error>', (done: any) => {
      const payload: Log = {
        '_id': '1',
        'what': 'test',
        'why': 'test',
        'how': 'test',
        'with': 'test',
        'who': 'test',
        'where': 'test',
        'when': '01/01/1970, 00:00:00',
        'case': '1',
        'result': ''
      };

      logService.deleteLog(payload).subscribe((log) => {
        // pass
      },
      (error: any) => {
        expect(error.error).toBeTruthy();
        done();
      });

      const logRequest = httpMock.expectOne(`${url}/api/log/1`);
      logRequest.error(new ErrorEvent('error'));
    });
  });
});

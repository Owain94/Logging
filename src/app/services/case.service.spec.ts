import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  ResponseType,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CaseService } from './case.service';
import { Case } from '../store/models/case.model';

describe('The case service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CaseService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('loadCases()', () => {
    it('should return an Observable<Array<Case>>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const mockResponse = [{
          '_id': '1',
          'name': 'test',
          'description': 'test'
        }, {
          '_id': '2',
          'name': 'test',
          'description': 'test'
        }];

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        caseService.loadCases().subscribe((cases) => {
          expect(cases.length).toEqual(2);
          expect(cases[0]._id).toEqual('1');
          expect(cases[0].name).toEqual('test');
          expect(cases[0].description).toEqual('test');
          expect(cases[1]._id).toEqual('2');
          expect(cases[1].name).toEqual('test');
          expect(cases[1].description).toEqual('test');
        });

    }));

    it('should throw an Observable<error>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        caseService.loadCases().subscribe((cases) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });

  describe('addCase()', () => {
    it('should return an Observable<Case>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const payload: Case = {
          'name': 'test',
          'description': 'test'
        };

        const mockResponse = {
          '_id': '1',
          'name': 'test',
          'description': 'test',
          'error': 'false'
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        caseService.addCase(payload).subscribe((singleCase: Case) => {
          expect(singleCase._id).toEqual('1');
          expect(singleCase.name).toEqual('test');
          expect(singleCase.description).toEqual('test');
          expect(JSON.parse(singleCase.error)).toBeFalsy();
        });

    }));

    it('should throw an Observable<error>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const payload: Case = {
          'name': 'test',
          'description': 'test'
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        caseService.addCase(payload).subscribe((cases) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });

  describe('editCase()', () => {
    it('should return an Observable<Case>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const payload: Case = {
          '_id': '1',
          'name': 'test',
          'description': 'test'
        };

        const mockResponse = {
          '_id': '1',
          'name': 'test',
          'description': 'test',
          'error': 'false'
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        caseService.editCase(payload).subscribe((singleCase: Case) => {
          expect(singleCase._id).toEqual('1');
          expect(singleCase.name).toEqual('test');
          expect(singleCase.description).toEqual('test');
          expect(JSON.parse(singleCase.error)).toBeFalsy();
        });

    }));

    it('should throw an Observable<error>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const payload: Case = {
          '_id': '1',
          'name': 'test',
          'description': 'test'
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        caseService.editCase(payload).subscribe((singleCase) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });

  describe('DeleteCase()', () => {
    it('should return an Observable<Case>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const payload: Case = {
          '_id': '1',
          'name': 'test',
          'description': 'test'
        };

        const mockResponse = {
          '_id': '1',
          'error': 'false'
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        caseService.deleteCase(payload).subscribe((singleCase: Case) => {
          expect(singleCase._id).toEqual('1');
          expect(JSON.parse(singleCase.error)).toBeFalsy();
        });

    }));

    it('should throw an Observable<error>',
        inject([CaseService, XHRBackend], (caseService: CaseService, mockBackend: MockBackend) => {

        const payload: Case = {
          '_id': '1',
          'name': 'test',
          'description': 'test'
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        caseService.deleteCase(payload).subscribe((singleCase) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });
});

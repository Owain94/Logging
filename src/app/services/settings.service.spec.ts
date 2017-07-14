import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  ResponseType,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SettingsService } from './settings.service';
import { Settings } from '../store/models/settings.model';

describe('The settings service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SettingsService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('loadSettings()', () => {
    it('should return an Observable<Settings>',
        inject([SettingsService, XHRBackend], (settingsService: SettingsService, mockBackend: MockBackend) => {

        const mockResponse = {
          '_id': '1',
          'name': 'test',
          'case': 'test',
          'invpre': 'test',
          'location': 'test',
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        settingsService.loadSettings().subscribe((settings) => {
          expect(settings._id).toEqual('1');
          expect(settings.name).toEqual('test');
          expect(settings.case).toEqual('test');
          expect(settings.invpre).toEqual('test');
          expect(settings.location).toEqual('test');
        });

    }));

    it('should throw an Observable<error>',
        inject([SettingsService, XHRBackend], (settingsService: SettingsService, mockBackend: MockBackend) => {

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        settingsService.loadSettings().subscribe((settings) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });

  describe('addSettings()', () => {
    it('should return an Observable<Settings>',
        inject([SettingsService, XHRBackend], (settingsService: SettingsService, mockBackend: MockBackend) => {

        const setting: Settings = {
          'name': 'test',
          'case': 'test',
          'invpre': 'test',
          'location': 'test',
        };

        const mockResponse = {
          '_id': '1',
          'error': 'false',
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        settingsService.addSettings(setting).subscribe((settings: Settings) => {
          expect(settings._id).toEqual('1');
          expect(JSON.parse(settings.error)).toBeFalsy();
        });

    }));

    it('should throw an Observable<error>',
        inject([SettingsService, XHRBackend], (settingsService: SettingsService, mockBackend: MockBackend) => {

        const setting: Settings = {
          'name': 'test',
          'case': 'test',
          'invpre': 'test',
          'location': 'test',
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        settingsService.addSettings(setting).subscribe((settings) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });

  describe('editSettings()', () => {
    it('should return an Observable<Settings>',
        inject([SettingsService, XHRBackend], (settingsService: SettingsService, mockBackend: MockBackend) => {

        const setting: Settings = {
          'name': 'test',
          'case': 'test',
          'invpre': 'test',
          'location': 'test',
        };

        const mockResponse = {
          '_id': '1',
          'error': 'false',
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        settingsService.editSettings(setting).subscribe((settings: Settings) => {
          expect(settings._id).toEqual('1');
          expect(JSON.parse(settings.error)).toBeFalsy();
        });

    }));

    it('should throw an Observable<error>',
        inject([SettingsService, XHRBackend], (settingsService: SettingsService, mockBackend: MockBackend) => {

        const setting: Settings = {
          'name': 'test',
          'case': 'test',
          'invpre': 'test',
          'location': 'test',
        };

        mockBackend.connections.subscribe((connection: any) => {
          connection.mockError(new ResponseOptions({
            type: ResponseType.Error,
            status: 500
          }));
        });

        settingsService.editSettings(setting).subscribe((settings) => {
          // pass
        },
        (error: any) => {
          expect(error.error).toBeTruthy();
        });
    }));
  });
});

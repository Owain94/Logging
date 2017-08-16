import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BrokerService } from './broker.service';

describe('The broker service', () => {
  let brokerService: BrokerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BrokerService
      ]
    });

    brokerService = TestBed.get(BrokerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should instantiate',
    inject([BrokerService], (service: BrokerService) => {
      expect(service instanceof BrokerService).toBeTruthy();
    })
  );

  it('scroll should echo scrollTo', (done: any) => {
    brokerService.scroll.subscribe((res: [number, number, ScrollBehavior]) => {
      expect(res[0]).toEqual(0);
      expect(res[1]).toEqual(1);
      expect(res[2]).toEqual('instant');
      done();
    });

    brokerService.scrollTo(0, 1, 'instant');
  });

  it('disableScroll should echo stopScroll', (done: any) => {
    brokerService.disableScroll.subscribe((res: boolean) => {
      expect(res).toBeFalsy();
      done();
    });

    brokerService.stopScroll(false);
  });

  it('setHtmlText should echo setText', (done: any) => {
    brokerService.setHtmlText.subscribe((res: {
      'i': number,
      'where': string,
      'what': string,
      'why': string,
      'how': string,
      'with': string,
      'result': string
    }) => {
      expect(res.i).toEqual(0);
      expect(res.where).toEqual('test');
      expect(res.what).toEqual('test');
      expect(res.why).toEqual('test');
      expect(res.how).toEqual('test');
      expect(res.with).toEqual('test');
      expect(res.result).toEqual('test');
      done();
    });

    brokerService.setText({
      'i': 0,
      'where': 'test',
      'what': 'test',
      'why': 'test',
      'how': 'test',
      'with': 'test',
      'result': 'test',
      'timeout': 0
    });
  });

  it('exportData should echo publishData', (done: any) => {
    brokerService.exportData.subscribe((res: [any, string]) => {
      expect(res[0]).toEqual({});
      expect(res[1]).toEqual('test');
      done();
    });

    brokerService.publishData([{}, 'test']);
  });

  it('notification should echo notificationText', (done: any) => {
    brokerService.notification.subscribe((res: {title: string, content: string}) => {
      expect(res.title).toEqual('title');
      expect(res.content).toEqual('content');
      done();
    });

    brokerService.notificationText('title', 'content');
  });
});

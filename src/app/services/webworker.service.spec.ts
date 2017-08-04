import { TestBed, inject } from '@angular/core/testing';

import { WebworkerService } from './webworker.service';

class Test {
  static test(str?: string ): string {
    if (str) {
      return str;
    }
    return 'test';
  }
}

describe('The webworker service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebworkerService
      ],
    });
  });

  it('should instantiate',
    inject([WebworkerService], (service: WebworkerService) => {
      expect(service instanceof WebworkerService).toBeTruthy();
    })
  );

  it('should return test with run()',
    inject([WebworkerService], (service: WebworkerService) => {
      const promise = service.run(Test.test);
      const promise2 = service.run(Test.test);

      promise.then((res) => {
        expect(res).toEqual('test');
        service.terminate(promise);
      });

      promise2.then((res) => {
        expect(res).toEqual('test');
        service.terminate(promise);
      });
    })
  );

  it('should return input with run()',
    inject([WebworkerService], (service: WebworkerService) => {
      const promise = service.run(Test.test, 'testing');

      promise.then((res) => {
        expect(res).toEqual('testing');
        service.terminate(promise);
      });
    })
  );

  it('should return test with runUrl()',
    inject([WebworkerService], (service: WebworkerService) => {
      const resolveString: string = Test.test.toString();
    // tslint:disable-next-line:no-inferrable-types
      const webWorkerTemplate: string = `
        self.addEventListener('message', function(e) {
          postMessage((${resolveString})(e.data));
        });
      `;
      const blob: Blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
      const objectUrl = URL.createObjectURL(blob);

      const promise = service.runUrl(objectUrl);

      promise.then((res) => {
        expect(res).toEqual('test');
        service.terminate(promise);
      });
    })
  );

  it('should return input with runUrl()',
    inject([WebworkerService], (service: WebworkerService) => {
      const resolveString: string = Test.test.toString();
    // tslint:disable-next-line:no-inferrable-types
      const webWorkerTemplate: string = `
        self.addEventListener('message', function(e) {
          postMessage((${resolveString})(e.data));
        });
      `;
      const blob: Blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
      const objectUrl = URL.createObjectURL(blob);

      const promise = service.runUrl(objectUrl, 'testing');

      promise.then((res) => {
        expect(res).toEqual('testing');
        service.terminate(promise);
      });
    })
  );
});

import { Injectable } from '@angular/core';

import { WebworkerInterface } from '../interfaces/webworker.interface';

@Injectable()
export class WebworkerService implements WebworkerInterface {
  private workerFunctionToUrlMap: WeakMap<Function, string> = new WeakMap<Function, string>();
  private promiseToWorkerMap: WeakMap<Promise<any>, Worker> = new WeakMap<Promise<any>, Worker>();

  private static createWorkerUrl(resolve: Function): string {
    const resolveString: string = resolve.toString();
    // tslint:disable-next-line:no-inferrable-types
    const webWorkerTemplate: string = `
      self.addEventListener('message', function(e) {
        postMessage((${resolveString})(e.data));
      });
    `;
    const blob: Blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
    return URL.createObjectURL(blob);
  }

  //noinspection FunctionNamingConventionJS
  run<T>(workerFunction: (any: any) => T, data?: any): Promise<T> {
    const url: string = this.getOrCreateWorkerUrl(workerFunction);
    return this.runUrl(url, data);
  }

  runUrl(url: string, data?: any): Promise<any> {
    const worker: Worker = new Worker(url);
    const promise: Promise<Object> = this.createPromiseForWorker(worker, data);
    const promiseCleaner: (T: any) => Object = this.createPromiseCleaner(promise);

    this.promiseToWorkerMap.set(promise, worker);

    promise
      .then(promiseCleaner)
      .catch(promiseCleaner);

    return promise;
  }

  terminate<T>(promise: Promise<T>): Promise<T> {
    return this.removePromise(promise);
  }

  private createPromiseForWorker<T>(worker: Worker, data: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      worker.addEventListener('message', (event) => resolve(event.data));
      worker.addEventListener('error', reject);
      worker.postMessage(data);
    });
  }

  private getOrCreateWorkerUrl(fn: Function): string {
    if (!this.workerFunctionToUrlMap.has(fn)) {
      const url: string = WebworkerService.createWorkerUrl(fn);
      this.workerFunctionToUrlMap.set(fn, url);
      return url;
    }
    return this.workerFunctionToUrlMap.get(fn);
  }

  private createPromiseCleaner<T>(promise: Promise<T>): (T: any) => T {
    return (event) => {
      //noinspection JSIgnoredPromiseFromCall
      this.removePromise(promise);
      return event;
    };
  }

  private removePromise<T>(promise: Promise<T>): Promise<T> {
    const worker: Worker = this.promiseToWorkerMap.get(promise);
    if (worker) {
      worker.terminate();
    }
    this.promiseToWorkerMap.delete(promise);
    return promise;
  }
}

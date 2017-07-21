export interface WebworkerInterface {
  run<T>(workerFunction: (any: any) => T, data?: any): Promise<T>;
  runUrl(url: string, data?: any): Promise<any>;
  terminate<T>(promise: Promise<T>): Promise<T>;
}

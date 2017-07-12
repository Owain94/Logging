import { Observable } from 'rxjs/Observable';

export function logObservable(target: any, propertyKey: string ) {
  let propertyValue: any;

  function getter() {
    return propertyValue;
  }

  function setter(value: any) {
    if (value instanceof Observable ) {
      propertyValue = value.do(res => {
        const isArrayOfObjects = Array.isArray(res) && typeof res[0] === 'object';
        const logType = isArrayOfObjects ? 'table' : 'log';
        console.log(`%c Begin observable`, `color: #9E9E9E; font-weight: bold`, propertyKey);
        console.groupCollapsed(propertyKey);
        console[logType](res)
        console.groupEnd();

        if (Array.isArray(res.data)) {
          console.log(`%c Begin data`, `color: #eee; font-weight: bold`, propertyKey);
          console.groupCollapsed(propertyKey);
          console.table(res)
          console.groupEnd();
          console.log(`%c End data`, `color: #eee; font-weight: bold`, propertyKey);
        }

        console.log(`%c End observable`, `color: #9E9E9E; font-weight: bold`, propertyKey);
      });
    } else {
      propertyValue = value;
    }
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

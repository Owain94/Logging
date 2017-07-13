import { Observable } from 'rxjs/Observable';

export function logObservable(target: any, propertyKey: string ) {
  let propertyValue: any;

  function getter() {
    return propertyValue;
  }

  function setter(value: any) {
    if (process.env.NODE_ENV !== 'production' && typeof(window) !== 'undefined' && value instanceof Observable) {
      propertyValue = value.do(res => {
        const isArrayOfObjects = Array.isArray(res) && typeof res[0] === 'object';
        const logType = isArrayOfObjects ? 'table' : 'log';
        console.groupCollapsed(`Observable: ${propertyKey}`);
        console[logType](res)

        if (Array.isArray(res.data)) {
          console.groupCollapsed(`Data: ${propertyKey}`);
          console.table(res.data)
        console.groupEnd();
        }

        console.groupEnd();
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

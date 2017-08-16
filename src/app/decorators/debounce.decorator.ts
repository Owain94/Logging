export function Debounce(delay: number = 300): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeout: any = null

    const original = descriptor.value;

    descriptor.value = function (...args: Array<any>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}

export function Log(): ClassDecorator {
  return function (constructor: any) {
    if (process.env.NODE_ENV === 'development' && process.env.NODE_PLATFORM === 'client') {
      const LIFECYCLE_HOOKS = [
        'ngOnInit',
        'ngOnChanges',
        'ngOnDestroy'
      ];
      const component = constructor.name;

      LIFECYCLE_HOOKS.forEach(hook => {
        const original = constructor.prototype[hook];

        constructor.prototype[hook] = function () {
          console.log(`%c ${component} - ${hook}`, `color: #4CAF50; font-weight: bold`);
          // tslint:disable-next-line:no-unused-expression
          original && original.apply(this);
        };
      });
    }
  };
}

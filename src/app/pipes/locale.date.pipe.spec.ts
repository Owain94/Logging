import { LocaleDatePipe } from './locale.date.pipe';

describe('the locale date pipe', () => {
  let localeDatePipe: LocaleDatePipe;

  beforeEach(() => {
    localeDatePipe = new LocaleDatePipe();
  });

  describe('transform()', () => {
    it('should transforms 0 to "01/01/1970, 01:00"', () => {
      // tslint:disable-next-line:no-inferrable-types
      const value: number = 0;
      expect(localeDatePipe.transform(value)).toEqual(0)
    });

    it('should transforms 100000 to "01/01/1970, 01:01"', () => {
      // tslint:disable-next-line:no-inferrable-types
      const value: number = 100000;
      expect(localeDatePipe.transform(value)).toEqual('1-1-1970, 1:01')
    });

    it('should return if the input is null', () => {
      const value: null = null;

      expect(localeDatePipe.transform(value)).toEqual(value)
    });

    it('should return if the input is undefined', () => {
      const value: undefined = undefined;

      expect(localeDatePipe.transform(value)).toEqual(value)
    });
  });
});

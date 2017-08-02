import { CapitalizePipe } from './capitalize.pipe';

describe('the capitalize pipe', () => {
  let capitalizePipe: CapitalizePipe;

  beforeEach(() => {
    capitalizePipe = new CapitalizePipe();
  });

  describe('transform()', () => {
    it('should transforms "test" to "Test"', () => {
      const value = 'test';

      expect(capitalizePipe.transform(value)).toEqual('Test')
    });

    it('should return if there is no input', () => {
      const value = '';

      expect(capitalizePipe.transform(value)).toEqual(value)
    });

    it('should return if the input is null', () => {
      const value: null = null;

      expect(capitalizePipe.transform(value)).toEqual(value)
    });

    it('should return if the input is undefined', () => {
      const value: undefined = undefined;

      expect(capitalizePipe.transform(value)).toEqual(value)
    });
  });
});

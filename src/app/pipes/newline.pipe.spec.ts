import { NewlinePipe } from './newline.pipe';

describe('the newline pipe', () => {
  let newlinePipe: NewlinePipe;

  beforeEach(() => {
    newlinePipe = new NewlinePipe();
  });

  describe('transform()', () => {
    it('should transforms "test\ntest" to "test<br />test"', () => {
      const value = 'test\ntest';

      expect(newlinePipe.transform(value)).toEqual('test<br />test')
    });

    it('should transforms "test" to "test"', () => {
      const value = 'test';

      expect(newlinePipe.transform(value)).toEqual('test')
    });

    it('should return if there is no input', () => {
      const value = '';

      expect(newlinePipe.transform(value)).toEqual(value)
    });

    it('should return if the input is null', () => {
      const value: null = null;

      expect(newlinePipe.transform(value)).toEqual(value)
    });

    it('should return if the input is undefined', () => {
      const value: undefined = undefined;

      expect(newlinePipe.transform(value)).toEqual(value)
    });
  });
});

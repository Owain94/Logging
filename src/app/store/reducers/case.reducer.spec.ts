import { caseReducer } from './case.reducer';

describe('The case reducer', () => {
  it('should handle initial state', () => {
    expect(
      caseReducer([], { type: '' })
    )
    .toEqual([]);
  });

  it('should fall through when the action type is invalid', () => {
    expect(
      caseReducer([], { type: '' })
    )
    .toEqual([]);
  });

});

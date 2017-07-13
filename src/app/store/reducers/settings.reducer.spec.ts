import { settingsReducer } from './settings.reducer';

describe('The settings reducer', () => {
  it('should handle initial state', () => {
    expect(
      settingsReducer([], { type: '' })
    )
    .toEqual([]);
  });

  it('should fall through when the action type is invalid', () => {
    expect(
      settingsReducer([], { type: '' })
    )
    .toEqual([]);
  });

});

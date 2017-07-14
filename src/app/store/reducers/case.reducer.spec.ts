import { caseReducer, initialState } from './case.reducer';
import { CaseActions } from '../actions/case.actions';

const state = {
  data: [
    {
      _id: '1',
      name: 'test',
      description: 'test',
    }
  ],
  type: 'LOAD_CASES',
  error: false
};

const payload = {
  _id: '',
  name: '',
  description: ''
}

const payloadEdit = {
  _id: '1',
  name: '',
  description: ''
}

describe('The case reducer', () => {
  it('initial state should return empty', () => {
    expect(
      initialState()
    )
    .toEqual([]);
  });

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

  it('should handle LOAD_CASES_SUCCESS', () => {
    const subject = caseReducer([], { type: CaseActions.LOAD_CASES_SUCCESS, payload: state })
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_CASE_SUCCESS', () => {
    const subject = caseReducer(state, { type: CaseActions.ADD_CASE_SUCCESS, payload: payload })
    expect(subject.data.length).toEqual(2);
    expect(subject.error).toBeFalsy();
  });

  it('should handle ADD_CASE_FAILURE', () => {
    const subject = caseReducer(state, { type: CaseActions.ADD_CASE_FAILURE, payload: payload })
    expect(subject.data.length).toEqual(1);
    expect(subject.error).toBeTruthy();
  });

  it('should handle EDIT_CASE_SUCCESS', () => {
    const subject = caseReducer(state, { type: CaseActions.EDIT_CASE_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('');
    expect(subject.data[0].description).toEqual('');
    expect(subject.error).toBeFalsy();
  });

  it('should handle EDIT_CASE_FAILURE', () => {
    const subject = caseReducer(state, { type: CaseActions.EDIT_CASE_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('test');
    expect(subject.data[0].description).toEqual('test');
    expect(subject.error).toBeTruthy();
  });

  it('should handle DELETE_CASE_SUCCESS', () => {
    const subject = caseReducer(state, { type: CaseActions.DELETE_CASE_SUCCESS, payload: payloadEdit })
    expect(subject.data.length).toEqual(0);
    expect(subject.error).toBeFalsy();
  });

  it('should handle DELETE_CASE_FAILURE', () => {
    const subject = caseReducer(state, { type: CaseActions.DELETE_CASE_FAILURE, payload: payloadEdit })
    expect(subject.data.length).toEqual(1);
    expect(subject.data[0].name).toEqual('test');
    expect(subject.data[0].description).toEqual('test');
    expect(subject.error).toBeTruthy();
  });

});

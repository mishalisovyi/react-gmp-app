import { CommonAction } from 'common/store';
import { commonReducer, initialState } from './reducer';

const error = new Error('test');

it('should return initial state', () => {
  const state = commonReducer(undefined, { type: 'non-existing' });

  expect(state).toEqual(initialState);
});

it('should set error to state', () => {
  const state = commonReducer(initialState, {
    type: CommonAction.SetHttpError,
    httpError: error,
  });

  expect(state.httpError).toEqual(error);
});

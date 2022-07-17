import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CommonAction, clearHttpError } from 'common/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  httpError: new Error('test'),
};

it('should dispatch clear HTTP error action', () => {
  const expectedActions = [
    { type: CommonAction.SetHttpError, httpError: null },
  ];

  const store = mockStore(initialState);
  store.dispatch(clearHttpError());

  expect(store.getActions()).toEqual(expectedActions);
});

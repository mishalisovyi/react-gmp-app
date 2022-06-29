import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearHttpError } from 'common/store/actions';
import { ErrorBoundary, State } from 'core';
import { HomePage } from 'pages/Home';

function App() {
  const dispatch = useDispatch();
  const httpError = useSelector((state: State) => state.common.httpError);

  if (httpError) {
    // eslint-disable-next-line no-alert
    alert(httpError);

    // This timeout is used to avoid immediate action dispatching causing 'bad setState() error'
    setTimeout(() => {
      dispatch(clearHttpError());
    });
  }

  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;

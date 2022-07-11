import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { clearHttpError } from 'common/store/actions';

import { ErrorBoundary } from 'core/components';
import { State } from 'core/interfaces';
import { NotFoundPage } from 'core/pages';

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
      <BrowserRouter>
        <Routes>
          <Route path="search" element={<HomePage />} />
          <Route path="search/:searchQuery" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

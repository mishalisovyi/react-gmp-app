import React from 'react';

import { ErrorBoundary } from 'core';
import { HomePage } from 'pages/Home';

function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;

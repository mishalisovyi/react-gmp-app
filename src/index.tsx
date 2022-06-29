import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { commonReducer } from 'common/store/reducer';
import { moviesReducer } from 'entities/movie/store';

import './styles.scss';

import App from './App';

const store = configureStore({
  reducer: {
    common: commonReducer,
    movies: moviesReducer,
  },
});

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(app);

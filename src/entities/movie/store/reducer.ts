import { AnyAction } from '@reduxjs/toolkit';

import { MOVIES_SORTING_SELECT_DATA, MOVIES_TABS_DATA } from 'entities/movie/constants';
import {
  MoviesAction,
  MoviesState,
  SetMoviesAction,
  SetMoviesGenreFilterAction,
  SetMoviesLoadingAction,
  SetMoviesSearchTermAction,
  SetMoviesSortFieldAction,
  SetSelectedMovieAction,
} from 'entities/movie/store';

const initialState: MoviesState = {
  moviesList: [],
  listRequestParameters: {
    sortField: MOVIES_SORTING_SELECT_DATA.defaultValue,
    genreFilter: MOVIES_TABS_DATA.defaultValue,
    searchTerm: '',
  },
  selectedMovie: null,
  loading: false,
};

const setMovies = (state: MoviesState, { moviesList }: SetMoviesAction) => {
  return {
    ...state,
    moviesList,
  };
};

const setMoviesLoading = (state: MoviesState, { loading }: SetMoviesLoadingAction) => {
  return {
    ...state,
    loading,
  };
};

const setMoviesSortField = (state: MoviesState, { sortField }: SetMoviesSortFieldAction) => {
  return {
    ...state,
    listRequestParameters: {
      ...state.listRequestParameters,
      sortField,
    },
  };
};

const setMoviesGenreFilter = (state: MoviesState, { genreFilter }: SetMoviesGenreFilterAction) => {
  return {
    ...state,
    listRequestParameters: {
      ...state.listRequestParameters,
      genreFilter,
    },
  };
};

const setMoviesSearchTerm = (state: MoviesState, { searchTerm }: SetMoviesSearchTermAction) => {
  return {
    ...state,
    listRequestParameters: {
      ...state.listRequestParameters,
      searchTerm,
    },
  };
};

const setSelectedMovie = (state: MoviesState, { selectedMovie }: SetSelectedMovieAction) => {
  return {
    ...state,
    selectedMovie,
  };
};

export function moviesReducer(state = initialState, action: AnyAction): MoviesState {
  switch (action.type) {
    case MoviesAction.SetMovies: return setMovies(state, action as SetMoviesAction);
    case MoviesAction.SetMoviesLoading: return setMoviesLoading(state, action as SetMoviesLoadingAction);
    case MoviesAction.SetMoviesSortField: return setMoviesSortField(state, action as SetMoviesSortFieldAction);
    case MoviesAction.SetMoviesGenreFilter: return setMoviesGenreFilter(state, action as SetMoviesGenreFilterAction);
    case MoviesAction.SetMoviesSearchTerm: return setMoviesSearchTerm(state, action as SetMoviesSearchTermAction);
    case MoviesAction.SetSelectedMovie: return setSelectedMovie(state, action as SetSelectedMovieAction);

    default: return state;
  }
}

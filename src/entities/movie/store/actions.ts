import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { setHttpError } from 'common/store/actions';
import { State } from 'core';

import { Movie, MovieData } from 'entities/movie/interfaces';

import {
  getMovies,
  addMovie,
  editMovie,
  deleteMovie,
} from 'entities/movie/services';

import {
  MoviesState,
  MoviesAction,
  SetMoviesAction,
  SetMoviesLoadingAction,
  SetMoviesSortFieldAction,
  SetMoviesGenreFilterAction,
  SetMoviesSearchTermAction,
  SetSelectedMovieAction,
} from 'entities/movie/store';

// Simple actions

export const setMovies = (moviesList: Movie[]): SetMoviesAction => {
  return {
    moviesList,
    type: MoviesAction.SetMovies,
  };
};

export const setMoviesLoading = (loading: boolean): SetMoviesLoadingAction => {
  return {
    loading,
    type: MoviesAction.SetMoviesLoading,
  };
};

export const setMoviesSortField = (sortField: string): SetMoviesSortFieldAction => {
  return {
    sortField,
    type: MoviesAction.SetMoviesSortField,
  };
};

export const setMoviesGenreFilter = (genreFilter: string): SetMoviesGenreFilterAction => {
  return {
    genreFilter,
    type: MoviesAction.SetMoviesGenreFilter,
  };
};

export const setMoviesSearchTerm = (searchTerm: string): SetMoviesSearchTermAction => {
  return {
    searchTerm,
    type: MoviesAction.SetMoviesSearchTerm,
  };
};

export const setSelectedMovie = (selectedMovie: Movie | null): SetSelectedMovieAction => {
  return {
    selectedMovie,
    type: MoviesAction.SetSelectedMovie,
  };
};

// Thunk actions

export const getMoviesSuccess = (movies: Movie[]) => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(setMovies(movies));
  };
};

export const getMoviesFailure = (error: Error) => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(setMovies([]));
    dispatch(setHttpError(error));
  };
};

export const requestGetMovies = (): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>, getState: () => State) => {
    dispatch(setMoviesLoading(true));

    const { movies: { listRequestParameters } } = getState();

    getMovies(listRequestParameters)
      .then((response) => dispatch(getMoviesSuccess(response.data)))
      .catch((error) => dispatch(getMoviesFailure(error)));
  };
};

export const sortMovies = (sortField: string): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesSortField(sortField));
    dispatch(requestGetMovies());
  };
};

export const filterMovies = (genreFilter: string): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesGenreFilter(genreFilter));
    dispatch(requestGetMovies());
  };
};

export const searchMovies = (searchTerm: string): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesSearchTerm(searchTerm));
    dispatch(requestGetMovies());
  };
};

export const addMovieSuccess = () => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(requestGetMovies());
  };
};

export const addMovieFailure = (error: Error) => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(setHttpError(error));
  };
};

export const requestAddMovie = (movieData: MovieData): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(true));

    addMovie(movieData)
      .then(() => dispatch(addMovieSuccess()))
      .catch((error) => dispatch(addMovieFailure(error)));
  };
};

export const editMovieSuccess = () => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(requestGetMovies());
  };
};

export const editMovieFailure = (error: Error) => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(setHttpError(error));
  };
};

export const requestEditMovie = (movieData: MovieData): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(true));

    editMovie(movieData)
      .then(() => dispatch(editMovieSuccess()))
      .catch((error) => dispatch(editMovieFailure(error)));
  };
};

export const deleteMovieSuccess = () => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(requestGetMovies());
  };
};

export const deleteMovieFailure = (error: Error) => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(false));
    dispatch(setHttpError(error));
  };
};

export const requestDeleteMovie = (movieId: number): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setMoviesLoading(true));

    deleteMovie(movieId)
      .then(() => dispatch(deleteMovieSuccess()))
      .catch((error) => dispatch(deleteMovieFailure(error)));
  };
};

export const selectMovie = (movie: Movie): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setSelectedMovie(movie));
  };
};

export const deselectMovie = (): any => {
  return (dispatch: ThunkDispatch<MoviesState, null, AnyAction>) => {
    dispatch(setSelectedMovie(null));
  };
};

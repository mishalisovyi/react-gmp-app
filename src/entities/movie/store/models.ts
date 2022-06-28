import { Action } from '@reduxjs/toolkit';

import { Movie, MoviesListRequestParameters } from 'entities/movie/interfaces';

// Actions types

export enum MoviesAction {
  RequestGetMovies = 'REQUEST_GET_MOVIES',
  RequestAddMovie = 'REQUEST_ADD_MOVIE',
  RequestEditMovie = 'REQUEST_EDIT_MOVIE',
  RequestDeleteMovie = 'REQUEST_DELETE_MOVIE',

  GetMoviesSuccess = 'GET_MOVIES_SUCCESS',
  AddMovieSuccess = 'ADD_MOVIE_SUCCESS',
  EditMovieSuccess = 'EDIT_MOVIES_SUCCESS',
  DeleteMovieSuccess = 'DELETE_MOVIE_SUCCESS',

  GetMoviesFailure = 'GET_MOVIES_FAILURE',
  AddMovieFailure = 'ADD_MOVIE_FAILURE',
  EditMovieFailure = 'EDIT_MOVIES_FAILURE',
  DeleteMovieFailure = 'DELETE_MOVIE_FAILURE',

  SetMovies = 'SET_MOVIES',
  SetMoviesLoading = 'SET_MOVIES_LOADING',
  SetMoviesSortField = 'SET_MOVIES_SORT_FIELD',
  SetMoviesGenreFilter = 'SET_MOVIES_GENRE_FILTER',
  SetMoviesSearchTerm = 'SET_MOVIES_SEARCH_TERM',
  SetSelectedMovie = 'SET_SELECTED_MOVIE',
}

// Simple actions models

export interface SetMoviesAction extends Action<MoviesAction.SetMovies> {
  moviesList: Movie[];
}

export interface SetMoviesLoadingAction extends Action<MoviesAction.SetMoviesLoading> {
  loading: boolean;
}

export interface SetMoviesSortFieldAction extends Action<MoviesAction.SetMoviesSortField> {
  sortField: string;
}

export interface SetMoviesGenreFilterAction extends Action<MoviesAction.SetMoviesGenreFilter> {
  genreFilter: string;
}

export interface SetMoviesSearchTermAction extends Action<MoviesAction.SetMoviesSearchTerm> {
  searchTerm: string;
}

export interface SetSelectedMovieAction extends Action<MoviesAction.SetSelectedMovie> {
  selectedMovie: Movie | null;
}

// State

export interface MoviesState {
  moviesList: Movie[];
  listRequestParameters: MoviesListRequestParameters;
  selectedMovie: Movie | null;
  loading: boolean;
}

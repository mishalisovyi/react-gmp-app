import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from 'common/ui';
import { State } from 'core';
import { MoviesDashboard, MoviesFilterPanel } from 'entities/movie/components';
import { filterMovies, requestGetMovies, sortMovies } from 'entities/movie/store';

export function MoviesContainer() {
  const dispatch = useDispatch();
  const movies = useSelector((state: State) => state.movies.moviesList);
  const loading = useSelector((state: State) => state.movies.loading);

  useEffect(() => {
    dispatch(requestGetMovies());
  }, []);

  const handleMoviesSorting = useCallback((sortField: string) => {
    dispatch(sortMovies(sortField));
  }, []);

  const handleMoviesGenreFiltering = useCallback((genreFilter: string) => {
    dispatch(filterMovies(genreFilter));
  }, []);

  return (
    <>
      <MoviesFilterPanel
        onSortingPerformed={handleMoviesSorting}
        onGenreFilterApplied={handleMoviesGenreFiltering}
      />
      {loading ? <Spinner /> : <MoviesDashboard movies={movies} />}
    </>
  );
}

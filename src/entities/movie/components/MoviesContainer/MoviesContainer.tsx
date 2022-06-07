import React, { useCallback, useEffect, useState } from 'react';

import { Spinner } from 'common/ui';
import { MoviesDashboard, MoviesFilterPanel } from 'entities/movie/components';
import { MOVIES_SORTING_SELECT_DATA } from 'entities/movie/constants';
import { useMovies } from 'entities/movie/hooks';
import { Movie } from 'entities/movie/interfaces';

export function MoviesContainer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortField, setSortField] = useState(MOVIES_SORTING_SELECT_DATA.defaultValue as string);

  const { getList, loading } = useMovies();

  useEffect(() => {
    const handleMoviesGetting = async () => {
      const moviesData = await getList({ sortField });

      setMovies(moviesData);
    };

    handleMoviesGetting();
  }, [sortField]);

  const handleMoviesSorting = useCallback((sortFieldValue: string) => {
    setSortField(sortFieldValue);
  }, []);

  return (
    <>
      <MoviesFilterPanel
        defaultSortField={MOVIES_SORTING_SELECT_DATA.defaultValue as string}
        onSort={handleMoviesSorting}
      />
      {loading ? <Spinner /> : <MoviesDashboard movies={movies} />}
    </>
  );
}

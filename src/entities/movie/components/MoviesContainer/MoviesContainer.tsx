import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Spinner } from 'common/ui';
import { MoviesDashboard, MoviesFilterPanel } from 'entities/movie/components';
import { MOVIES_SORTING_SELECT_DATA, MOVIES_TABS_DATA } from 'entities/movie/constants';
import { MovieContext } from 'entities/movie/contexts';
import { useMovies } from 'entities/movie/hooks';
import { Movie } from 'entities/movie/interfaces';

interface MoviesContainerProps {
  searchTerm?: string;
}

export function MoviesContainer({ searchTerm }: MoviesContainerProps) {
  const { getMovies, loading } = useMovies();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortField, setSortField] = useState(MOVIES_SORTING_SELECT_DATA.defaultValue as string);
  const [genreFilter, setGenreFilter] = useState(MOVIES_TABS_DATA.defaultValue as string);

  const { moviesAreOutdatedCounter } = useContext(MovieContext);

  useEffect(() => {
    const handleMoviesGetting = async () => {
      const moviesData = await getMovies({ sortField, searchTerm, genreFilter });

      setMovies(moviesData);
    };

    handleMoviesGetting();
  }, [sortField, searchTerm, genreFilter, moviesAreOutdatedCounter]);

  const handleMoviesSorting = useCallback((sortFieldValue: string) => {
    setSortField(sortFieldValue);
  }, []);

  const handleMoviesGenreFiltering = useCallback((genre: string) => {
    setGenreFilter(genre);
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

MoviesContainer.defaultProps = {
  searchTerm: '',
};

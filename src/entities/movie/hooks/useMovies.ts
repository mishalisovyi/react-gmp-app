import { useCallback, useState } from 'react';

import { sortingCompare } from 'common/util';
import { MOVIES_DATA, MOVIES_SORTING_SELECT_DATA, MOVIES_TABS_DATA } from 'entities/movie/constants';
import { Movie, MovieData } from 'entities/movie/interfaces';

const MOCKED_POSTER_PATH = 'https://images.unsplash.com/photo-1567981964482-ce4df477dd67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NjYzNzQ0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60';

/**
 * TODO: It needs to be deleted after implementation of data loading from server
 */
const timeout = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

const filterMoviesByGenre = (moviesData: Movie[], genreFilter: string) => {
  if (genreFilter === MOVIES_TABS_DATA.defaultValue) {
    return moviesData;
  }

  return moviesData.filter((item) => item.genres.includes(genreFilter));
};

const searchMovies = (moviesData: Movie[], searchTerm: string) => {
  return moviesData.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase())
      || item.overview.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

const sortMovies = (moviesData: Movie[], sortField: string) => {
  return moviesData.sort((itemA, itemB) => sortingCompare(itemA, itemB, sortField as string));
};

export function useMovies() {
  const [loading, setLoading] = useState(false);

  const getMovies = useCallback(async ({
    sortField = MOVIES_SORTING_SELECT_DATA.defaultValue,
    genreFilter = MOVIES_TABS_DATA.defaultValue,
    searchTerm = '',
  } = {}) => {
    setLoading(true);
    await timeout(1000);
    setLoading(false);

    const filteredMovies = filterMoviesByGenre(MOVIES_DATA, genreFilter);
    const searchedMovies = searchMovies(filteredMovies, searchTerm);
    const sortedMovies = sortMovies(searchedMovies, sortField as string);

    return sortedMovies;
  }, []);

  const addMovie = useCallback(async (movieData: MovieData) => {
    setLoading(true);

    await timeout(1000);

    MOVIES_DATA.push({
      ...movieData,
      id: Date.now(),
      poster_path: MOCKED_POSTER_PATH,
    });

    setLoading(false);
  }, []);

  const editMovie = useCallback(async (movieId: number, movieData: MovieData) => {
    setLoading(true);

    await timeout(1000);

    const editedMovieIndex = MOVIES_DATA.findIndex((movie) => movie.id === movieId);
    MOVIES_DATA[editedMovieIndex] = {
      ...movieData,
      id: movieId,
      poster_path: MOCKED_POSTER_PATH,
    };

    setLoading(false);
  }, []);

  const deleteMovie = useCallback(async (movieId: number) => {
    setLoading(true);

    await timeout(1000);

    const deletedMovieIndex = MOVIES_DATA.findIndex((movie) => movie.id === movieId);
    MOVIES_DATA.splice(deletedMovieIndex, 1);

    setLoading(false);
  }, []);

  return {
    loading,
    getMovies,
    addMovie,
    editMovie,
    deleteMovie,
  };
}

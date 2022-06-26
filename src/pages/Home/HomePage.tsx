import React, { useCallback, useMemo, useState } from 'react';

import { MoviesContainer } from 'entities/movie/components';
import { MovieContext } from 'entities/movie/contexts';
import { Movie } from 'entities/movie/interfaces';
import { HomePageFooter, HomePageHeader } from 'pages/Home';

import styles from './HomePage.module.scss';

export function HomePage() {
  const [movie, setMovie] = useState<Movie | null>(null);

  // Each time when list of movies should be refreshed, counter value is incremented
  const [moviesAreOutdatedCounter, setMoviesAreOutdatedCounter] = useState(0);
  const [moviesSearchTerm, setMoviesSearchTerm] = useState<string>('');

  const requestMoviesLoading = () => {
    setMoviesAreOutdatedCounter((value) => value + 1);
  };

  const contextData = useMemo(() => ({
    movie,
    setMovie,
    moviesAreOutdatedCounter,
    requestMoviesLoading,
  }), [movie, moviesAreOutdatedCounter]);

  const handleMoviesSearch = useCallback((searchTerm: string) => {
    setMoviesSearchTerm(searchTerm);
  }, []);

  return (
    <MovieContext.Provider value={contextData}>
      <HomePageHeader onMoviesSearch={handleMoviesSearch} />
      <main className={styles['MoviesContainer']}>
        <MoviesContainer searchTerm={moviesSearchTerm} />
      </main>
      <HomePageFooter />
    </MovieContext.Provider>
  );
}

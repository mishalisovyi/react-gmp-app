import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { MoviesContainer } from 'entities/movie/components';
import { searchMovies } from 'entities/movie/store';
import { HomePageFooter, HomePageHeader } from 'pages/Home';

import styles from './HomePage.module.scss';

export function HomePage() {
  const dispatch = useDispatch();

  const handleMoviesSearch = useCallback((searchTerm: string) => {
    dispatch(searchMovies(searchTerm));
  }, []);

  return (
    <>
      <HomePageHeader onMoviesSearch={handleMoviesSearch} />
      <main className={styles['MoviesContainer']}>
        <MoviesContainer />
      </main>
      <HomePageFooter />
    </>
  );
}

import React from 'react';

import { MovieCard } from 'entities/movie/components';
import { Movie } from 'entities/movie/interfaces';

import styles from './MoviesDashboard.module.scss';

interface MoviesDashboardProps {
  movies: Movie[]
}

export function MoviesDashboard({ movies }: MoviesDashboardProps) {
  return (
    <>
      <div className={styles['MoviesDashboard__items-number-title']}>
        <span className="typography-body-semibold">{movies.length}</span>
        <span className="typography-body"> movies found</span>
      </div>
      <div className={styles['MoviesDashboard__items-grid']}>
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </>
  );
}

import React from 'react';

import { LabelPrimary } from 'common/ui';
import { formatMinutesTimeRange } from 'common/util';
import { Movie } from 'entities/movie/interfaces';

import styles from './MovieDetails.module.scss';

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <article className={styles['MovieDetails']}>
      <img className={styles['MovieDetails__poster']} src={movie.poster_path} alt={movie.title} />

      <div className={styles['MovieDetails__main-block']}>
        <div className={styles['main-block__header']}>
          <h1 className={styles['main-block__title']}>{movie.title}</h1>
          <LabelPrimary value={movie.vote_average} />
          <div className={styles['main-block__tagline']}>{movie.tagline}</div>
        </div>
        <div className={styles['main-block__secondary-info']}>
          <div className={styles['main-block__secondary-info-item']}>{new Date(movie.release_date).getFullYear()}</div>
          <div className={styles['main-block__secondary-info-item']}>{formatMinutesTimeRange(movie.runtime)}</div>
        </div>
        <p className={styles['main-block__overview']}>{movie.overview}</p>
      </div>
    </article>
  );
}

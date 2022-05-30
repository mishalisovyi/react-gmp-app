import React from 'react';

import { EnumerableComponentProps } from 'common/interfaces';
import { Label } from 'common/ui';
import { Movie } from 'entities/movie/interfaces';

import styles from './MovieCard.module.scss';

interface MovieCardProps extends EnumerableComponentProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={styles['MovieCard']}>
      <img className={styles['MovieCard__poster']} src={movie.poster_path} alt={movie.title} />
      <div className={styles['MovieCard__info']}>
        <div className={styles['info__summary']}>
          <div className={styles['info__title']}>{movie.title}</div>
          <div className={styles['info__tagline']}>{movie.tagline}</div>
        </div>
        <Label value={new Date(movie.release_date).getFullYear()} />
      </div>
    </div>
  );
}

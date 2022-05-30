import React, { useState } from 'react';

import { MOVIES_DATA } from 'entities/movie';
import { MoviesDashboard, MoviesFilterPanel } from 'entities/movie/components';
import { Movie } from 'entities/movie/interfaces';

export function MoviesContainer() {
  const [movies] = useState<Movie[]>(MOVIES_DATA);

  return (
    <>
      <MoviesFilterPanel />
      <MoviesDashboard movies={movies} />
    </>
  );
}

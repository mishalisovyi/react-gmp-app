import { createContext } from 'react';

import { Movie } from 'entities/movie/interfaces';

interface MovieContextData {
  movie?: Movie | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  moviesAreOutdatedCounter: number;
  requestMoviesLoading: () => void;
}

export const MovieContext = createContext<MovieContextData>({
  movie: null,
  setMovie: () => { },
  moviesAreOutdatedCounter: 0,
  requestMoviesLoading: () => { },
});

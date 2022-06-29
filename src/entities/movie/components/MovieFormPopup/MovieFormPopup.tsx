import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PopupDialog, Spinner } from 'common/ui';
import { State } from 'core';

import { MOVIES_GENRES } from 'entities/movie/constants';
import { Movie, MovieData } from 'entities/movie/interfaces';
import { requestAddMovie, requestEditMovie } from 'entities/movie/store';

import styles from './MovieFormPopup.module.scss';

interface MovieFormPopupProps {
  onClose: (parameter: { confirmed: boolean }) => void;
  movie?: Movie;
}

const parseFormDataToMovieData = (formData: any): MovieData => ({
  title: formData.title as string,
  tagline: 'Some test tagline',
  vote_average: parseFloat(formData.vote_average),
  vote_count: 1,
  release_date: formData.release_date as string,
  poster_path: formData.poster_path as string,
  overview: formData.overview as string,
  budget: 100_000_000,
  revenue: 120_000_000,
  genres: [formData.genres] as string[],
  runtime: parseInt(formData.runtime, 10),
});

// TODO: implement form validation within the task related to forms

export function MovieFormPopup({ onClose, movie }: MovieFormPopupProps) {
  const dispatch = useDispatch();
  const loading = useSelector((state: State) => state.movies.loading);

  const formRef = useRef<HTMLFormElement>(null);

  const setFormValues = (movieData: Movie) => {
    const formElement = formRef.current;

    if (formElement) {
      Object.entries(movieData).forEach(([key, value]) => {
        // @ts-ignore
        const element = formElement.elements[key];

        if (element) {
          element.value = Array.isArray(value) ? value[0] : value;
        }
      });
    }
  };

  useEffect(() => {
    if (movie) {
      setFormValues(movie);
    }
  }, []);

  const handleFormSubmit = useCallback(() => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const parsedFormData = Object.fromEntries(formData.entries()) as any;
    const movieData = parseFormDataToMovieData(parsedFormData);

    dispatch(movie ? requestEditMovie({ ...movieData, id: movie.id }) : requestAddMovie(movieData));

    onClose({ confirmed: true });
  }, [formRef, movie, onClose]);

  const handleFormReset = useCallback(() => {
    const formElement = formRef.current;

    if (formElement) {
      Object.keys(formElement.elements).forEach((key) => {
        // @ts-ignore
        formElement.elements[key].value = '';
      });
    }
  }, [formRef]);

  const handlePopupClose = useCallback(() => {
    onClose({ confirmed: false });
  }, [onClose]);

  return (
    <PopupDialog
      title={`${movie ? 'Edit' : 'Add'} movie`}
      onPrimaryButtonClick={handleFormSubmit}
      onSecondaryButtonClick={handleFormReset}
      onClose={handlePopupClose}
    >
      {loading ? <Spinner /> : (
        <form className={styles['MovieFormPopup__form']} ref={formRef}>
          <div className={styles['form__main-info']}>
            <div className="form-group">
              <label className="form-group__label">Title</label>
              <input className="form-group__control" type="text" name="title" placeholder="Moana" />
              <div className="form-group__validation-message">Required</div>
            </div>

            <div className="form-group">
              <label className="form-group__label">Release Date</label>
              <input className="form-group__control" type="date" name="release_date" placeholder="Select Date" />
              <div className="form-group__validation-message">Required</div>
            </div>

            <div className="form-group">
              <label className="form-group__label">Movie URL</label>
              <input className="form-group__control" type="text" name="poster_path" prefix="https://" />
              <div className="form-group__validation-message">Required</div>
            </div>

            <div className="form-group">
              <label className="form-group__label">Rating</label>
              <input className="form-group__control" type="number" step="0.1" name="vote_average" placeholder="7.8" />
              <div className="form-group__validation-message">Required</div>
            </div>

            <div className="form-group">
              <label className="form-group__label">Genre</label>
              <select className="form-group__control" name="genres" placeholder="Select Genre">
                {MOVIES_GENRES.map((genre) => (<option value={genre} key={genre}>{genre}</option>))}
              </select>
              <div className="form-group__validation-message">Required</div>
            </div>

            <div className="form-group">
              <label className="form-group__label">Runtime</label>
              <input className="form-group__control" type="number" name="runtime" placeholder="minutes" />
              <div className="form-group__validation-message">Required</div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-group__label">Overview</label>
            <textarea className="form-group__control" rows={3} name="overview" placeholder="Movie description" />
            <div className="form-group__validation-message">Required</div>
          </div>
        </form>
      )}
    </PopupDialog>
  );
}

MovieFormPopup.defaultProps = {
  movie: null,
};

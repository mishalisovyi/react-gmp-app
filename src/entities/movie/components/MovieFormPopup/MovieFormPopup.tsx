import React, { MouseEventHandler } from 'react';

import { PopupDialog } from 'common/ui';
import { Movie } from 'entities/movie/interfaces';

import styles from './MovieFormPopup.module.scss';

interface MovieFormPopupProps {
  onClose: MouseEventHandler<HTMLButtonElement>
  movie?: Movie;
}

// TODO: implement form validation within the task related to forms

export function MovieFormPopup({ onClose, movie }: MovieFormPopupProps) {
  const onFormSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('ON FORM SUBMIT');
  };

  const onFormReset = () => {
    // eslint-disable-next-line no-console
    console.log('ON FORM RESET');
  };

  return (
    <PopupDialog
      title={`${movie ? 'Edit' : 'Add'} movie`}
      onPrimaryButtonClick={onFormSubmit}
      onSecondaryButtonClick={onFormReset}
      onClose={onClose}
    >
      <form className={styles['MovieFormPopup__form']}>
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
            <input className="form-group__control" type="text" name="url" prefix="https://" />
            <div className="form-group__validation-message">Required</div>
          </div>

          <div className="form-group">
            <label className="form-group__label">Rating</label>
            <input className="form-group__control" type="number" step="0.1" name="rating" placeholder="7.8" />
            <div className="form-group__validation-message">Required</div>
          </div>

          <div className="form-group">
            <label className="form-group__label">Genre</label>
            <select className="form-group__control" name="genre" placeholder="Select Genre">
              <option value="crime">Crime</option>
              <option value="documentary">Documentary</option>
              <option value="horror">Horror</option>
              <option value="comedy">Comedy</option>
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
    </PopupDialog>
  );
}

MovieFormPopup.defaultProps = {
  movie: null,
};

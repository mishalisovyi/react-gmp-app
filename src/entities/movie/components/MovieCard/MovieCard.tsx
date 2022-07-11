import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Icon } from 'common/constants';
import { useRouter } from 'common/hooks';
import { ButtonType } from 'common/enums';
import { EnumerableComponentProps } from 'common/interfaces';

import { MovieFormPopup } from 'entities/movie/components';
import { DELETE_MOVIE_POPUP_CONFIRMATION_MESSAGE, DELETE_MOVIE_POPUP_CONFIRMATION_TITLE, MOVIE_MENU_ITEMS } from 'entities/movie/constants';
import { MovieMenuItems } from 'entities/movie/enums';
import { Movie } from 'entities/movie/interfaces';
import { requestDeleteMovie, selectMovie } from 'entities/movie/store';

import {
  Button, DropdownMenu, LabelSecondary, PopupConfirmation,
} from 'common/ui';

import styles from './MovieCard.module.scss';

interface MovieCardProps extends EnumerableComponentProps {
  movie: Movie;
}

function MovieCardComponent({ movie }: MovieCardProps) {
  const dispatch = useDispatch();

  const { setQueryParameters } = useRouter();

  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showEditMoviePopup, setShowEditMoviePopup] = useState(false);
  const [showDeleteMoviePopup, setShowDeleteMoviePopup] = useState(false);

  // General handlers

  const handleMovieCardMouseEnter = () => {
    setShowMenuButton(true);
  };

  const handleMovieCardMouseLeave = () => {
    setShowMenuButton(false);
  };

  const handleMovieCardClick = () => {
    setQueryParameters({ movie: movie.id });
    dispatch(selectMovie(movie));
  };

  // Popups handlers

  const handleMenuOptionClick = useCallback((option: string) => {
    if (option === MovieMenuItems.Edit) {
      setShowEditMoviePopup(true);
    }

    if (option === MovieMenuItems.Delete) {
      setShowDeleteMoviePopup(true);
    }
  }, []);

  const handleEditMoviePopupClosing = () => {
    setShowEditMoviePopup(false);
  };

  const handleDeleteMoviePopupClosing = () => {
    setShowDeleteMoviePopup(false);
  };

  const handleDeleteMoviePopupConfirming = () => {
    setShowDeleteMoviePopup(false);

    dispatch(requestDeleteMovie(movie.id));
  };

  return (
    <>
      <div className={styles['MovieCard']} onMouseEnter={handleMovieCardMouseEnter} onMouseLeave={handleMovieCardMouseLeave} onClick={handleMovieCardClick}>
        <div className={styles['MovieCard__menu']}>
          <DropdownMenu items={MOVIE_MENU_ITEMS} onOptionClicked={handleMenuOptionClick}>
            {showMenuButton && <Button type={ButtonType.Menu} text={Icon.VERTICAL_ELLIPSIS} />}
          </DropdownMenu>
        </div>

        <div className={styles['MovieCard__container']}>
          <img className={styles['MovieCard__poster']} src={movie.poster_path} alt={movie.title} />
          <div className={styles['MovieCard__info']}>
            <div className={styles['info__summary']}>
              <div className={styles['info__title']}>{movie.title}</div>
              <div className={styles['info__tagline']}>{movie.tagline}</div>
            </div>
            <LabelSecondary value={new Date(movie.release_date).getFullYear()} />
          </div>
        </div>
      </div>

      {showEditMoviePopup && (
        <MovieFormPopup movie={movie} onClose={handleEditMoviePopupClosing} />
      )}

      {showDeleteMoviePopup && (
        <PopupConfirmation
          title={DELETE_MOVIE_POPUP_CONFIRMATION_TITLE}
          message={DELETE_MOVIE_POPUP_CONFIRMATION_MESSAGE}
          onConfirm={handleDeleteMoviePopupConfirming}
          onClose={handleDeleteMoviePopupClosing}
        />
      )}
    </>
  );
}

export const MovieCard = memo(MovieCardComponent);

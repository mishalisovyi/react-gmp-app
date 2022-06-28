import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from 'common/constants';
import { ButtonType } from 'common/enums';
import {
  Button,
  Logo,
  PopupInfo,
  SearchPanel,
} from 'common/ui';

import { State } from 'core';

import { MovieDetails, MovieFormPopup } from 'entities/movie/components';
import { deselectMovie } from 'entities/movie/store';

import styles from './HomePageHeader.module.scss';

interface HomePageHeaderProps {
  onMoviesSearch: (serchTerm: string) => void
}

function HomePageHeaderComponent({ onMoviesSearch }: HomePageHeaderProps) {
  const dispatch = useDispatch();

  const movie = useSelector((state: State) => state.movies.selectedMovie);

  const [showAddMoviePopupDialog, setShowAddMoviePopupDialog] = useState(false);
  const [showMovieAddedPopupInfo, setShowMovieAddedPopupInfo] = useState(false);

  const handleSearchButtonClick = () => {
    dispatch(deselectMovie());
  };

  const handleAddMovieButtonClick = useCallback(() => {
    setShowAddMoviePopupDialog(true);
  }, []);

  const handleMovieFormPopupClosing = ({ confirmed = false } = {}) => {
    setShowAddMoviePopupDialog(false);

    if (confirmed) {
      setShowMovieAddedPopupInfo(true);
    }
  };

  const handleMovieAddedPopupClosing = () => {
    setShowMovieAddedPopupInfo(false);
  };

  const bodyOffsetClass = useMemo(() => {
    return movie ? '' : styles['HomePageHeader__body--offset'];
  }, [movie]);

  return (
    <>
      <header className={styles['HomePageHeader']}>
        <div className={styles['HomePageHeader__head']}>
          <Logo />
          {movie
            ? (
              <Button
                type={ButtonType.Search}
                text={Icon.TELEPHONE_RECORDER}
                onClick={handleSearchButtonClick}
              />
            )
            : <Button type={ButtonType.Tertiary} text="+ ADD MOVIE" onClick={handleAddMovieButtonClick} />}
        </div>

        <div className={`${styles['HomePageHeader__body']} ${bodyOffsetClass}`}>
          {movie ? <MovieDetails movie={movie} /> : <SearchPanel labelText="Find your movie" onSearch={onMoviesSearch} />}
        </div>
      </header>

      {showAddMoviePopupDialog && <MovieFormPopup onClose={handleMovieFormPopupClosing} />}

      {showMovieAddedPopupInfo && <PopupInfo title="Congratulations !" message="The movie has been added to database successfully" onClose={handleMovieAddedPopupClosing} />}
    </>
  );
}

export const HomePageHeader = memo(HomePageHeaderComponent);

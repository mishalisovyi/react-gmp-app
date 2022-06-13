import React, {
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Icon } from 'common/constants';
import { ButtonType } from 'common/enums';
import {
  Button,
  Logo,
  PopupInfo,
  SearchPanel,
} from 'common/ui';
import { MovieDetails, MovieFormPopup } from 'entities/movie/components';
import { MovieContext } from 'entities/movie/contexts';

import styles from './HomePageHeader.module.scss';

interface HomePageHeaderProps {
  onMoviesSearch: (serchTerm: string) => void
}

function HomePageHeaderComponent({ onMoviesSearch }: HomePageHeaderProps) {
  const [showAddMoviePopupDialog, setShowAddMoviePopupDialog] = useState(false);
  const [showMovieAddedPopupInfo, setShowMovieAddedPopupInfo] = useState(false);

  const { movie, setMovie, setMoviesAreOutdatedCounter } = useContext(MovieContext);

  const handleSearchButtonClick = () => {
    setMovie(null);
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
    setMoviesAreOutdatedCounter((value) => value + 1);
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

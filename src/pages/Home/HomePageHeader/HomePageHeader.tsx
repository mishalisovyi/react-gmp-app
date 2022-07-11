import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from 'common/constants';
import { ButtonType } from 'common/enums';
import { useRouter } from 'common/hooks';
import {
  Button,
  Logo,
  PopupInfo,
  SearchPanel,
  Spinner,
} from 'common/ui';

import { State } from 'core/interfaces';

import { MovieDetails, MovieFormPopup } from 'entities/movie/components';
import { deselectMovie, requestGetMovie, setMoviesListIsOutdated } from 'entities/movie/store';

import styles from './HomePageHeader.module.scss';

function HomePageHeaderComponent() {
  const dispatch = useDispatch();
  const movie = useSelector((state: State) => state.movies.selectedMovie);
  const loading = useSelector((state: State) => state.movies.loadingSingleMovie);

  const {
    params,
    navigate,
    getQueryParameters,
    removeQueryParameters,
  } = useRouter();

  const [showAddMoviePopupDialog, setShowAddMoviePopupDialog] = useState(false);
  const [showMovieAddedPopupInfo, setShowMovieAddedPopupInfo] = useState(false);

  useEffect(() => {
    const { movie: movieId } = getQueryParameters();

    if (movieId) {
      dispatch(requestGetMovie(+movieId));
    }
  }, []);

  const handleSearchButtonClick = () => {
    removeQueryParameters(['movie']);
    dispatch(deselectMovie());
  };

  const handleAddMovieButtonClick = useCallback(() => {
    setShowAddMoviePopupDialog(true);
  }, []);

  const handleMoviesSearch = useCallback((searchTerm: string) => {
    navigate(`/search/${searchTerm}`, { preserveQueryParameters: true });
    dispatch(setMoviesListIsOutdated(true));
  }, []);

  const handleMovieFormPopupClosing = useCallback(({ confirmed = false } = {}) => {
    setShowAddMoviePopupDialog(false);

    if (confirmed) {
      setShowMovieAddedPopupInfo(true);
    }
  }, []);

  const handleMovieAddedPopupClosing = useCallback(() => {
    setShowMovieAddedPopupInfo(false);
  }, []);

  const bodyOffsetClass = useMemo(() => {
    return movie ? '' : styles['HomePageHeader__body--offset'];
  }, [movie]);

  const headerHeadContent = useMemo(() => {
    return !loading && (
      movie
        ? (
          <Button
            type={ButtonType.Search}
            text={Icon.TELEPHONE_RECORDER}
            onClick={handleSearchButtonClick}
          />
        )
        : <Button type={ButtonType.Tertiary} text="+ ADD MOVIE" onClick={handleAddMovieButtonClick} />
    );
  }, [loading, movie, handleSearchButtonClick, handleAddMovieButtonClick]);

  const headerBodyContent = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }

    return movie ? <MovieDetails movie={movie} /> : <SearchPanel labelText="Find your movie" value={params.searchQuery} onSearch={handleMoviesSearch} />;
  }, [loading, movie, params.searchQuery, handleMoviesSearch]);

  return (
    <>
      <header className={styles['HomePageHeader']}>
        <div className={styles['HomePageHeader__head']}>
          <Logo />
          {headerHeadContent}
        </div>

        <div className={`${styles['HomePageHeader__body']} ${bodyOffsetClass}`}>
          {headerBodyContent}
        </div>
      </header>

      {showAddMoviePopupDialog && <MovieFormPopup onClose={handleMovieFormPopupClosing} />}

      {showMovieAddedPopupInfo && <PopupInfo title="Congratulations !" message="The movie has been added to database successfully" onClose={handleMovieAddedPopupClosing} />}
    </>
  );
}

export const HomePageHeader = memo(HomePageHeaderComponent);

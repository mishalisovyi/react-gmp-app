import React, { useCallback, useState } from 'react';

import { ButtonType } from 'common/enums';
import { Button, Logo, SearchPanel } from 'common/ui';
import { MovieFormPopup } from 'entities/movie/components';

import styles from './HomePageHeader.module.scss';

export function HomePageHeader() {
  const [showAddMoviePopupDialog, setShowAddMoviePopupDialog] = useState(false);

  const handleAddMovieButtonClick = useCallback(() => {
    setShowAddMoviePopupDialog(true);
  }, []);

  const handleMovieFormPopupClosing = () => {
    setShowAddMoviePopupDialog(false);
  };

  return (
    <>
      <header>
        <div className={styles['HomePageHeader']}>
          <div className={styles['HomePageHeader__head']}>
            <Logo />
            <Button type={ButtonType.Tertiary} text="+ ADD MOVIE" onClick={handleAddMovieButtonClick} />
          </div>

          <div className={styles['HomePageHeader__body']}>
            <SearchPanel labelText="Find your movie" />
          </div>
        </div>
      </header>

      {showAddMoviePopupDialog && <MovieFormPopup onClose={handleMovieFormPopupClosing} />}
    </>
  );
}
